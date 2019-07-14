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
    var map = this.state.history.last
    var grid = this.state.currentGrid
    // TODO: implement getRulesFromCols
    return [].concat(Util.getRulesFromRows(grid)).concat(Util.getRulesFromCols(grid))
  }

  determineLegalMoves(input) {
    var playerIcons = this.getPlayerIcons()
    return playerIcons.map(icon => {
      var to = Util.getNextPosition(icon.position, input)
      /**
       * Move is legal if:
       * - to space _exists_
       * - to space is blank
       * - to space is not solid
       * - to space is solid but can be pushed
       */
      var nextBlock = this.state.currentGrid[to.x][to.y]
      if (
        nextBlock &&
        (nextBlock.isBlank() || !nextBlock.isSolid())
      ) {
        return {to, from: icon.position}
      }
    }).filter(Boolean)
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

  undo() {
    console.log('UNDO!')
    this.state.history.revert(1)
  }

  reset() {
    console.log('RESET!')
    this.state.history = History.of(this.getCurrentLevel())
  }

  getCurrentState() {
    return this.state.history.last
  }

  getCurrentLevel() {
    return this.levels[this.currentLevel]
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
