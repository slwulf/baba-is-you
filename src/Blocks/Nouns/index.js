import BlockBase from '../Base.js'
import {TYPES} from '../../Constants.js'

class NounBase extends BlockBase {
  initialize() {
    this.type = TYPES.NOUN
  }
}

class Baba extends NounBase {}

export default {Baba}
