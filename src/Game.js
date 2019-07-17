import History from './History.js'
import Util from './Util.js'
import Blocks from './Blocks'
import Renderer from './Renderer'

export default class Game {
  constructor(levels = [''], legend = {}, engine) {
    this.legend = legend
    this.levels = levels
    this.renderer = new Renderer(engine)
    this.state = {
      history: History.of(
        Util.sanitizeMapString(levels[0])
      ),
      currentLevel: 0,
      currentGrid: Util.getObjectsForMap(levels[0], legend)
    }
  }

  undo() {
    this.state.history.revert(1)
  }

  reset() {
    this.state.history.revert()
  }

  updateState(input = '') {
    this.applyProperties(
      this.determineRules()
    )

    // TODO: bail early if YOU is not connected

    this.state.history.applyChanges(
      this.determineLegalMoves(
        this.getPlayerMoves(input),
        input
      )
    )

    this.state.currentGrid = Util.getObjectsForMap(
      this.state.history.last,
      this.legend
    )
  }

  determineRules() {
    var grid = this.state.currentGrid
    // TODO: implement getRulesFromCols
    return [].concat(Util.getRulesFromRows(grid)).concat(Util.getRulesFromCols(grid))
  }

  determineLegalMoves(moves, input, depth = 0) {
    if (moves.length === 0) return moves
    var queue = []
    var legalMoves = moves.map(move => {
      var block = this.getBlockAtPosition(move.from)
      var canMove = this.blockCanBeMovedTo(block, move.to)
      var nextBlock = this.getBlockAtPosition(move.to)
      var nextMove = !nextBlock ? null : {
        from: nextBlock.position,
        to: Util.getNextPosition(nextBlock.position, input)
      }
      var lastBlockInChain = this.getLastBlockInChain(block, move.to)
      var blockAfterChain = this.getBlockAtPosition(
        Util.getNextPosition(lastBlockInChain.position, input)
      )

      // TODO: solve the bug and then rewrite this mess

      // prevent chain from exceeding map boundaries
      if (!nextBlock || !blockAfterChain) return false
      if (!this.blockCanBeMovedTo(lastBlockInChain, blockAfterChain.position)) {
        return false
      }

      // this is here for debugging, would love to remove the depth check entirely
      if (depth > 5) {
        return this.blockCanBeMovedTo(block, move.to, true)
          ? move
          : false
      }

      // console.log(nextBlock)
      if (canMove === undefined && nextBlock && nextBlock.isMovable()) {
        if (!Util.arrayContainsObject(queue, move)) queue.push(move)
        if (!Util.arrayContainsObject(queue, nextMove)) queue.push(nextMove)
      }
      // console.log(queue)

      return canMove ? move : false
    }).filter(Boolean)

    if (queue.length - depth > depth) return legalMoves.concat(queue).reverse()
    return legalMoves.concat(this.determineLegalMoves(queue, input, depth + 1)).reverse()
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

  blockCanBeMovedTo(block, pos, allowMovable = false) {
    var destination = this.getBlockAtPosition(pos)
    if (!destination) return false
    var nextPos = Util.getNextPosition(destination.position, Util.getDirectionFromMoveDelta({
      from: block.position,
      to: pos
    }))

    if (destination.isSteppable()) return true
    if (allowMovable && destination.isMovable()) {
      return this.blockCanBeMovedTo(destination, nextPos)
    }
  }

  getPlayerMoves(input) {
    return this.getPlayerIcons().map(icon => ({
      to: Util.getNextPosition(icon.position, input),
      from: icon.position
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
}

Game.Blocks = Blocks
