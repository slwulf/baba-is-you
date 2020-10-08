import BlockBase from '../Base.js'
import {TYPES} from '../../Constants.js'

class IconBase extends BlockBase {
  initialize() {
    this.type = TYPES.ICON
    this.initializeName()
  }
}

class Baba extends IconBase {
  initializeName() {
    this.name = "Baba"
  }
}
class Rock extends IconBase {
  initializeName() {
    this.name = "Rock"
  }
}
class Wall extends IconBase {
  initializeName() {
    this.name = "Wall"
  }
}
class Flag extends IconBase {
  initializeName() {
    this.name = "Flag"
  }
}
class Skull extends IconBase {
  initializeName() {
    this.name = "Skull"
  }
}
class Water extends IconBase {
  initializeName() {
    this.name = "Water"
  }
}
class Eureka extends IconBase {
  initializeName() {
    this.name = "Eureka"
  }
}

export default {Baba, Rock, Wall, Flag, Skull, Water, Eureka}
