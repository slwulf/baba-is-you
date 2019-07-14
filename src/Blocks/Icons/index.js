import BlockBase from '../Base.js'
import {TYPES} from '../../Constants.js'

class IconBase extends BlockBase {
  initialize() {
    this.type = TYPES.ICON
  }
}

class Baba extends IconBase {}

export default {Baba}
