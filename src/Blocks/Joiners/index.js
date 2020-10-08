import BlockBase from '../Base.js'
import {TYPES} from '../../Constants.js'

class JoinerBase extends BlockBase {
  initialize() {
    this.type = TYPES.JOINER
    this.initializeName()
  }
}

class Is extends JoinerBase {
  initializeName() {
    this.name = "Is"
  }
}
class And extends JoinerBase {
  initializeName() {
    this.name = "And"
  }
}

export default {Is, And}
