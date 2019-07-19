import History from './History.js'
import Util from './Util.js'
import Blocks from './Blocks'
import Renderer from './Renderer'

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

  updateState(input = '') {
    this.applyProperties(
      this.determineRules()
    )

    // TODO: bail early if YOU is not connected

    var moves = this.determineLegalMoves(this.getPlayerMoves(input), input)
    var sortedMoves = Util.sortMoves(Util.deduplicateMoves(moves))

    if (this.didPlayerWin(sortedMoves)) {
      this.showWinAnimation().then(() => {
        // TODO: handle reaching the end of levels array
        this.setInitialState(this.state.currentLevel + 1)
      })
    }

    this.state.history.applyChanges(sortedMoves)
    this.updateCurrentGrid()
  }

  updateCurrentGrid() {
    this.state.currentGrid = Util.getObjectsForMap(
      this.state.history.last
    )
  }

  determineRules() {
    var grid = this.state.currentGrid
    // TODO: implement getRulesFromCols
    return [].concat(Util.getRulesFromRows(grid)).concat(Util.getRulesFromCols(grid))
  }

  determineLegalMoves(moves, direction, depth = 0) {
    if (moves.length === 0) return moves
    if (depth > moves.length) return moves

    var queue = []
    let firstBlockInChain = null
    var legalMoves = moves.map(move => {
      var fromBlock = this.getBlockAtPosition(move.from)
      var toBlock = this.getBlockAtPosition(move.to)
      var lastBlockInChain = this.getLastBlockInChain(fromBlock, move.to)
      var blockAfterChain = this.getBlockAtPosition(
        Util.getNextPosition(lastBlockInChain.position, direction)
      )
      var canMoveFirstBlock = this.blockCanBeMovedTo(fromBlock, move.to)
      var canMoveLastBlock = blockAfterChain
        ? this.blockCanBeMovedTo(lastBlockInChain, blockAfterChain.position)
        : false
      var chainLength = Util.getDistanceBetweenPositions(
        firstBlockInChain ? firstBlockInChain.position : fromBlock.position,
        lastBlockInChain ? lastBlockInChain.position : toBlock.position
      );

      if (firstBlockInChain === null) {
        firstBlockInChain = fromBlock
      }

      if (
        !canMoveFirstBlock ||
        !toBlock ||
        !blockAfterChain ||
        !canMoveLastBlock
      ) return false

      if (lastBlockInChain.isSteppable() || toBlock.isSteppable()) return move

      if (chainLength < queue.length) return move

      if (toBlock && toBlock.isMovable()) {
        var nextMove = {
          from: toBlock.position,
          to: Util.getNextPosition(toBlock.position, direction)
        }

        if (!Util.arrayContainsObject(queue, move)) queue.push(move)
        if (!Util.arrayContainsObject(queue, nextMove)) queue.push(nextMove)
      }
    }).filter(Boolean)

    return legalMoves.concat(this.determineLegalMoves(queue, direction, depth + 1))
  }

  getLastBlockInChain(block, pos) {
    var nextBlock = this.getBlockAtPosition(pos)
    var direction = Util.getDirectionFromMoveDelta({
      from: block.position,
      to: pos
    })

    if (!nextBlock) return block
    if (!nextBlock.isMovable()) return block
    return this.getLastBlockInChain(
      nextBlock,
      Util.getNextPosition(nextBlock.position, direction)
    )
  }

  blockCanBeMovedTo(block, pos) {
    var destination = this.getBlockAtPosition(pos)
    if (!destination) return false
    var nextPos = Util.getNextPosition(destination.position, Util.getDirectionFromMoveDelta({
      from: block.position,
      to: pos
    }))

    if (destination.isSteppable()) return true
    if (destination.isMovable()) {
      return this.blockCanBeMovedTo(destination, nextPos)
    }
  }

  getPlayerMoves(input) {
    return this.getPlayerIcons().map(icon => ({
      from: icon.position,
      to: Util.getNextPosition(icon.position, input)
    }))
  }

  applyProperties(rules) {
    rules.forEach(rule => {
      var icons = this.getIconsForNoun(rule.target)
      icons.forEach(icon => {
        rule.properties.forEach(p => icon.addProperty(p))
      })
    })
  }

  didPlayerWin(moves) {
    return moves.reduce((won, move) => {
      var fromBlock = this.getBlockAtPosition(move.from)
      var toBlock = this.getBlockAtPosition(move.to)
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

  getIconsForNoun(noun) {
    return this.state.currentGrid.flatMap(row => {
      return row.filter(block => block.isIcon() && block.name === noun.name)
    })
  }

  getPlayerIcons() {
    return this.state.currentGrid.flatMap(row => {
      return row.filter(block => {
        return block.isIcon() && block.isYou()
      })
    })
  }

  getBlockAtPosition({x, y}) {
    var row = this.state.currentGrid[x]
    return row ? row[y] : null
  }

  getCurrentState() {
    return this.state.history.last
  }

  getCurrentLevel() {
    return Util.sanitizeMapString(this.levels[this.state.currentLevel])
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
