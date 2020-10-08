import History from './History.js'
import Util from './Util.js'
import Levels from './Levels'
import Blocks from './Blocks'
import Renderer from './Renderer'
import Movement from './Movement'
import {INPUTS} from './Constants.js'

export default class Game {
  constructor(engine) {
    this.renderer = new Renderer(engine)
    this.setInitialState()
  }

  setInitialState(level = 0) {
    var CurrentLevel = Levels[level]
    var currentLevel = new CurrentLevel(Blocks)
    var map = currentLevel.getMap()
    var history = History.of(Util.sanitizeMapString(map))
    history.legend = currentLevel.getLegend()

    this.state = {
      currentLevel,
      history,
      currentGrid: currentLevel.toGrid(),
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
    var movement = new Movement(this.state.currentGrid)
    var moves = movement.getLegalMoves(dir)

    if (moves.length === 0) return
    if (this.didPlayerWin(moves)) {
      this.showWinAnimation().then(() => {
        // TODO: handle reaching the end of levels array
        this.setInitialState(this.state.currentLevel.toInt() + 1)
        this.renderFrame()
      })
    }

    this.state.history.applyChanges(moves)
    this.updateCurrentGrid()
  }

  updateCurrentGrid() {
    this.state.currentGrid = Util.getObjectsForMap(
      this.state.history.last,
      this.state.currentLevel.getLegend()
    )
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
    return Util.pauseForAction(250, () => {
      this.state.isWin = true
      this.renderFrame()
    }).then(() => Util.pauseForAction(2500, () => this.state.isWin = false))
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

  renderFrame() {
    // The render functions needs to be wrapped,
    // so that it can access the state of this.
    var wrappedRender = () => {
       this.render()
    }
    requestAnimationFrame(wrappedRender)
  }

  start() {
    this.renderFrame()
  }

  setKeyBindings(bind) {
    var dirs = [INPUTS.UP, INPUTS.RIGHT, INPUTS.DOWN, INPUTS.LEFT]
    bind(input => {
      var direction = dirs[input]
      if (direction !== undefined) {
        this.updateState(input)
      } else if (input === INPUTS.UNDO) {
        this.undo()
      } else if (input === INPUTS.RESET) {
        this.reset()
      }
      // Render the new state.
      this.renderFrame()
    }, INPUTS)
  }
}

