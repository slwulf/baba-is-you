import BlockBase from '../Base.js'

class PropertyBase extends BlockBase {
  initialize() {
    this.type = BlockBase.TYPES.PROPERTY
  }
}

class You extends PropertyBase {}

export default {You}
