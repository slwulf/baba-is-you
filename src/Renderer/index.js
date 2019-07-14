export default class Renderer {
  constructor(engine) {
    this.engine = engine
    this.frame = []
  }

  gridOpen() {
    this.frame.push(Renderer.SIGNALS.GRID_OPEN)
  }

  gridClose() {
    this.frame.push(Renderer.SIGNALS.GRID_CLOSE)
  }

  lineOpen() {
    this.frame.push(Renderer.SIGNALS.LINE_OPEN)
  }

  lineClose() {
    this.frame.push(Renderer.SIGNALS.LINE_CLOSE)
  }

  renderBlock(block) {
    this.frame.push(this.engine.renderBlock(block))
  }

  renderFrame() {
    return this.engine.renderFrame(this.frame)
  }

  renderFrameSync() {
    return this.engine.renderFrameSync(this.frame)
  }
}

Renderer.SIGNALS = {
  GRID_OPEN: 0,
  GRID_CLOSE: 1,
  LINE_OPEN: 2,
  LINE_CLOSE: 3
}
