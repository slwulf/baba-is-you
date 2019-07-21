import BlockBase from '../Base.js'
import {EFFECTS, TYPES} from '../../Constants.js'

class PropertyBase extends BlockBase {
  initialize() {
    this.type = TYPES.PROPERTY
    this.effects = {}
    this.setEffects()
  }

  setEffect(key, value) {
    this.effects[key] = value
  }

  hasEffect(key) {
    return !!this.effects[key]
  }
}

class You extends PropertyBase {
  setEffects() {
    this.setEffect(EFFECTS.YOU, true)
  }
}

class Stop extends PropertyBase {
  setEffects() {
    this.setEffect(EFFECTS.SOLID, true)
  }
}

class Push extends PropertyBase {
  setEffects() {
    this.setEffect(EFFECTS.SOLID, true)
    this.setEffect(EFFECTS.MOVABLE, true)
  }
}

class Win extends PropertyBase {
  setEffects() {
    this.setEffect(EFFECTS.WIN, true)
  }
}

class Defeat extends PropertyBase {
  setEffects() {
    this.setEffect(EFFECTS.DEFEAT, true)
  }
}

class Sink extends PropertyBase {
  setEffects() {
    this.setEffect(EFFECTS.SINK, true)
  }
}

export default {You, Stop, Push, Win, Defeat, Sink}
