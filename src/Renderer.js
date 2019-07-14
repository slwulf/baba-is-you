const blocks = {}

export default class Renderer {
  constructor($el) {
    this.$el = $el
  }

  gridOpen() {}

  gridClose() {}

  lineOpen() {}

  lineClose() {}

  renderBlock(block) {}
}
