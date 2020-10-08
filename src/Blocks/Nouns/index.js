import BlockBase from '../Base.js'
import Icons from '../Icons'
import {TYPES} from '../../Constants.js'

class NounBase extends BlockBase {
  initialize() {
    this.type = TYPES.NOUN
    this.initializeName()
  }
}

class Baba extends NounBase {
  initializeName() {
    this.name = "Baba"
  }
  iconBlock() {
    return Icons.Baba
  }
}
class Rock extends NounBase {
  initializeName() {
    this.name = "Rock"
  }
  iconBlock() {
    return Icons.Rock
  }
}
class Wall extends NounBase {
  initializeName() {
    this.name = "Wall"
  }
  iconBlock() {
    return Icons.Wall
  }
}
class Flag extends NounBase {
  initializeName() {
    this.name = "Flag"
  }
  iconBlock() {
    return Icons.Flag
  }
}
class Skull extends NounBase {
  initializeName() {
    this.name = "Skull"
  }
  iconBlock() {
    return Icons.Skull
  }
}
class Water extends NounBase {
  initializeName() {
    this.name = "Water"
  }
  iconBlock() {
    return Icons.Water
  }
}

export default {Baba, Rock, Wall, Flag, Skull, Water}
