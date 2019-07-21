import History from './History.js'
import Util from './Util.js'
import Blocks from './Blocks'
import Renderer from './Renderer'
import Movement from './Movement'

export default class Game {
  constructor(levels = [''], engine) {
    this.levels = levels
    this.renderer = new Renderer(engine)

    this.setInitialState()
  }

  setInitialState(currentLevel = 0) {
    var map = this.levels[currentLevel]
    this.state = {
      currentLevel,
      history: History.of(Util.sanitizeMapString(map)),
      currentGrid: Util.getObjectsForMap(map),
      isWin: false
    }
  }

  undo() {
    this.state.history.revert(1)
    this.updateCurrentGrid()
  }

  reset() {
    this.state.history.revert()
    this.updateCurrentGrid()
  }

  updateState(dir = '') {
    var movement = new Movement(this.state.currentGrid, this.determineRules())
    var moves = movement.getLegalMoves(dir)

    if (moves.length === 0) return
    if (this.didPlayerWin(moves)) {
      this.showWinAnimation().then(() => {
        // TODO: handle reaching the end of levels array
        this.setInitialState(this.state.currentLevel + 1)
      })
    }

    this.state.history.applyChanges(moves)
    this.updateCurrentGrid()
  }

  updateCurrentGrid() {
    this.state.currentGrid = Util.getObjectsForMap(
      this.state.history.last
    )
  }

  determineRules() {
    var grid = this.state.currentGrid
    return [].concat(Util.getRulesFromRows(grid)).concat(Util.getRulesFromCols(grid))
  }

  didPlayerWin(moves) {
    var grid = this.state.currentGrid
    return moves.reduce((won, move) => {
      var fromBlock = Util.getBlockAtPosition(grid, move.from)
      var toBlock = Util.getBlockAtPosition(grid, move.to)
      return won || (fromBlock.isYou() && toBlock.isWin())
    }, false)
  }

  showWinAnimation() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.state.isWin = true
        setTimeout(() => {
          this.state.isWin = false
          // TODO: be able to cancel this w/ player input
          resolve()
        }, 2500);
      }, 750)
    })
  }

  render() {
    if (this.state.isWin) {
      return this.renderer.renderWinScreen()
    }

    this.renderer.gridOpen()
    this.state.currentGrid.forEach(row => {
      this.renderer.lineOpen()
      row.forEach(block => {
        this.renderer.renderBlock(block)
      })
      this.renderer.lineClose()
    })
    this.renderer.gridClose()

    this.renderer.renderFrameSync()
  }

  start() {
    var render = () => {
      this.render()
      requestAnimationFrame(render)
    }

    requestAnimationFrame(render)
  }

  setKeyBindings(keys, bind) {
    var dirs = ['Up', 'Right', 'Down', 'Left']
    bind(key => {
      var command = keys[key]
      var direction = dirs[command]
      if (direction) {
        this.updateState(direction)
      } else if (command === Game.Keys.UNDO) {
        this.undo()
      } else if (command === Game.Keys.RESET) {
        this.reset()
      }
    })
  }
}

Game.Blocks = Blocks
Game.Keys = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
  UNDO: 4,
  RESET: 5
}
