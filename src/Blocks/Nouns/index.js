import BlockBase from '../Base.js'

class NounBase extends BlockBase {
  initialize() {
    this.type = BlockBase.TYPES.NOUN
  }
}

class Baba extends NounBase {}

export default {Baba}
