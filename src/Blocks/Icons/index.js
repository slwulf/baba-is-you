import BlockBase from '../Base.js'
import {TYPES} from '../../Constants.js'

class IconBase extends BlockBase {
  initialize() {
    this.type = TYPES.ICON
  }
}

class Baba extends IconBase {}
class Rock extends IconBase {}
class Wall extends IconBase {}
class Flag extends IconBase {}
class Skull extends IconBase {}

export default {Baba, Rock, Wall}
