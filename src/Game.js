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
      this.determineLegalMoves(input)
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

  determineLegalMoves(input) {
    var queue = []
    var playerMoves = this.getPlayerIcons().map(icon => {
      var to = Util.getNextPosition(icon.position, input)
      var nextBlock = this.getBlockAtPosition(to)
      var move = {to, from: icon.position}

      // can't move to a nonexistant block
      if (!nextBlock) return false

      // can move to a steppable (blank or not solid) block
      if (nextBlock.isSteppable()) return move

      // queue to determine if can move to movable block
      if (nextBlock.isMovable()) {
        queue.push(move)
        queue.push({
          from: move.to,
          to: Util.getNextPosition(move.to, input)
        })
      }
    }).filter(Boolean)

    return playerMoves
      .concat(this.processQueuedMoves(queue, input))
      // play queued moves in reverse so the end result
      // is the player's movement -- this avoids the player
      // stepping on a movable object and erasing it instead
      // of actually moving it
      .reverse()
  }

  processQueuedMoves(queue, input) {
    var requeue = []
    return queue.map(move => {
      var nextPos = Util.getNextPosition(move.to, input)
      var nextBlock = this.getBlockAtPosition(nextPos)

      // same logic as determineLegalMoves
      if (!nextBlock) return false
      if (nextBlock.isSteppable()) return move
      if (nextBlock.isMovable()) {
        requeue.push({
          from: move.to,
          to: nextPos
        })
      }
    }).concat(
      requeue.length > 0
        ? this.processQueuedMoves(requeue, input)
        : []
    ).filter(Boolean)
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
