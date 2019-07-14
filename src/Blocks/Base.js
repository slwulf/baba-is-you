import {EFFECTS, TYPES} from '../Constants.js'

export default class Base {
  get name() {
    return this.constructor.name
  }

  constructor(x = -1, y = -1) {
    this.position = {x,y}
    this.properties = []
    this.initialize()
  }

  initialize() {
    this.type = TYPES.BASE
  }

  addProperty(property) {
    this.properties.push(property)
  }

  setPosition(x, y) {
    this.position = {x, y}
  }

  setType(type) {
    this.type = type
  }

  isSolid() {
    return this.isWord() || this.properties.some(p => p.hasEffect(EFFECTS.SOLID))
  }

  isMovable() {
    return this.isWord() || this.properties.some(
      p => p.hasEffect(EFFECTS.SOLID) && p.hasEffect(EFFECTS.MOVABLE)
    )
  }

  isSteppable() {
    return this.isBlank() || !this.isSolid()
  }

  isYou() {
    return this.properties.some(p => p.hasEffect(EFFECTS.YOU))
  }

  isBlank() {
    return this.type === TYPES.BLANK
  }

  isIcon() {
    return this.type === TYPES.ICON
  }

  isNoun() {
    return this.type === TYPES.NOUN
  }

  isJoiner() {
    return this.type === TYPES.JOINER
  }

  isProperty() {
    return this.type === TYPES.PROPERTY
  }

  isWord() {
    return this.isNoun() || this.isJoiner() || this.isProperty()
  }
}
