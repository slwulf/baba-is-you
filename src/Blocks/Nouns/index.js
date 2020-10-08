import BlockBase from '../Base.js'
import {TYPES} from '../../Constants.js'

class NounBase extends BlockBase {
  initialize() {
    this.type = TYPES.NOUN
  }
}

class Baba extends NounBase {
class Baba extends NounBase {}
class Rock extends NounBase {}
class Wall extends NounBase {}
class Flag extends NounBase {}
class Skull extends NounBase {}
class Water extends NounBase {}
  iconBlock() {
    return Icons.Baba
  }
}
class Rock extends NounBase {
  iconBlock() {
    return Icons.Rock
  }
}
class Wall extends NounBase {
  iconBlock() {
    return Icons.Wall
  }
}
class Flag extends NounBase {
  iconBlock() {
    return Icons.Flag
  }
}
class Skull extends NounBase {
  iconBlock() {
    return Icons.Skull
  }
}
class Water extends NounBase {
  iconBlock() {
    return Icons.Water
  }
}

export default {Baba, Rock, Wall, Flag, Skull, Water}
