import Blocks from '../Blocks'
import Util from '../Util.js'
import {LEGEND} from '../Constants.js'

export default class Level {
  constructor() {
    this.Blocks = Blocks
    this.grid = null
  }

  toInt() {
    var name = this.constructor.name
    return Number(name.replace('Level_', ''))
  }

  toGrid() {
    if (this.grid === null) {
      this.grid = Util.getObjectsForMap(
        this.getMap(),
        this.getLegend()
      )
    }

    return this.grid
  }

  getMap() {
    return ''
  }

  getLegend() {
    return Level.DEFAULT_LEGEND
  }
}

Level.DEFAULT_LEGEND = LEGEND
