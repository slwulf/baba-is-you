export default class EngineBase {
  renderFrame(frame) {
    // TODO: async rendering sure would be cool huh
  }

  renderFrameSync(frame) {
    this.beforeRender()
    return frame.reduce(
      (seed, cell, i, F) =>
        this.accumulateFrame(seed, cell, i, F),
      this.getFrameSeed()
    )
  }

  beforeRender() {
    return null
  }

  renderBlock(block) {
    return null
  }

  getFrameSeed() {
    return null
  }

  accumulateFrame() {
    return null
  }
}
