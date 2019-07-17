import BlockBase from '../Base.js'
import {TYPES} from '../../Constants.js'

class NounBase extends BlockBase {
  initialize() {
    this.type = TYPES.NOUN
  }
}

class Baba extends NounBase {}
class Rock extends NounBase {}
class Wall extends NounBase {}
class Flag extends NounBase {}
class Skull extends NounBase {}

export default {Baba, Rock, Wall}
