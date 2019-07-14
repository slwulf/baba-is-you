import BlockBase from '../Base.js'

class IconBase extends BlockBase {
  initialize() {
    this.type = BlockBase.TYPES.ICON
  }
}

class Baba extends IconBase {}

export default {Baba}
