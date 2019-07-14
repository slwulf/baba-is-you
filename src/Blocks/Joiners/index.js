import BlockBase from '../Base.js'
import {TYPES} from '../../Constants.js'

class JoinerBase extends BlockBase {
  initialize() {
    this.type = TYPES.JOINER
  }
}

class Is extends JoinerBase {}
class And extends JoinerBase {}

export default {Is, And}
