import History from './History.js'
import Util from './Util.js'
import Blocks from './Blocks'

export default class Game {
  constructor(levels = [''], legend = {}) {
    this.legend = legend
    this.levels = levels
    this.state = {
      history: History.of(levels[0]),
      currentLevel: 0,
      currentGrid: Util.getObjectsForMap(levels[0], legend)
    }
  }

  updateState(input = '') {
    var rules = this.determineRules()
    var moves = this.determineMoves(rules, input)
    console.log(moves)

    // this.state.currentGrid = Util.getObjectsForMap(
    //   this.state.history.last
    // )
  }

  // function updateState(state, input) {
  //   var rules = determineRules(state)
  //   var moves = determineMoves(state, rules, input)
  //   var changes = moves.map(move => {
  //     if (isLegal(move, rules, state)) {
  //       return getStateChangeDiff(state, move, rules)
  //     }

  //     return isLegal(move, rules, state)
  //       ? getStateChangeDiff(state, move, rules)
  //       : null
  //   })

  //   return changes.reduce(applyStateChange, state)
  // }

  determineRules() {
    var map = this.state.history.last
    var grid = this.state.currentGrid
    // TODO: implement getRulesFromCols
    return [].concat(Util.getRulesFromRows(grid)).concat(Util.getRulesFromCols(grid))
  }

  determineMoves(rules, input) {
    var playerIcons = this.getPlayerIcons(rules)
    return playerIcons.map(icon => {
      var to = Util.getNextPosition(icon.position, input)
      return {to, from: icon.position}
    })
  }

  getPlayerIcons(rules) {
    var playerNouns = rules.map(rule => {
      return rule.hasProperty(Blocks.PROPERTIES.You.name)
        ? rule.target.name
        : null
    }).filter(Boolean)

    return this.state.currentGrid.flatMap(row => {
      return row.filter(block => {
        return (
          block.isIcon() &&
          playerNouns.indexOf(block.name) > -1
        )
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
}

Game.Blocks = Blocks
