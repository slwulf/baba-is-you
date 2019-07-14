export default class Base {
  constructor(x, y) {
    this.position = {x,y}
    this.initialize()
  }

  initialize() {
    this.type = Base.TYPES.BASE
    this.properties = []
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

  get name() {
    return this.constructor.name
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
