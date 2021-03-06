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
    this.engine.renderFrame(this.frame)
    this.frame.splice(0, this.frame.length)
  }

  renderFrameSync() {
    this.engine.renderFrameSync(this.frame)
    this.frame.splice(0, this.frame.length)
  }

  renderWinScreen() {
    this.engine.renderWinScreen()
  }
}

Renderer.SIGNALS = {
  GRID_OPEN: 0,
  GRID_CLOSE: 1,
  LINE_OPEN: 2,
  LINE_CLOSE: 3
}
