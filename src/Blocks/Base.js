import {EFFECTS} from '../Constants.js'

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
    this.type = Base.TYPES.BASE
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

  canBePlayer() {
    return this.isIcon()
  }

  isSolid() {
    return this.isWord() || this.properties.some(p => p.hasEffect(EFFECTS.SOLID))
  }

  isMovable() {
    return this.isWord() || this.properties.some(
      p => p.hasEffect(EFFECTS.SOLID) && p.hasEffect(EFFECTS.MOVABLE)
    )
  }

  isYou() {
    return this.properties.some(p => p.hasEffect(EFFECTS.YOU))
  }

  isBlank() {
    return this.type === Base.TYPES.BLANK
  }

  isIcon() {
    return this.type === Base.TYPES.ICON
  }

  isNoun() {
    return this.type === Base.TYPES.NOUN
  }

  isJoiner() {
    return this.type === Base.TYPES.JOINER
  }

  isProperty() {
    return this.type === Base.TYPES.PROPERTY
  }

  isWord() {
    return this.isNoun() || this.isJoiner() || this.isProperty()
  }
}

Base.TYPES = {
  BASE: 'base',
  BLANK: 'blank',
  ICON: 'icon',
  NOUN: 'noun',
  JOINER: 'joiner',
  PROPERTY: 'property'
}
