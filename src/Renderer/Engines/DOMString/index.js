import EngineBase from '../Base.js'
import Renderer from '../../../Renderer'

const blocks = {
  noun: {
    Baba: 'B'
  },
  icon: {
    Baba: 'b'
  },
  joiner: {
    Is: 's'
  },
  property: {
    You: 'U'
  }
}

export default class DOMString extends EngineBase {
  beforeRender() {
    // document.querySelector('#game pre').remove()
  }

  renderBlock(block) {
    if (block.isBlank()) return '_'
    return blocks[block.type][block.name] || '💩'
  }

  accumulateFrame(seed, cell) {
    if (cell === Renderer.SIGNALS.LINE_CLOSE) {
      return seed + '\n'
    }

    if (cell === Renderer.SIGNALS.GRID_CLOSE) {
      return seed
    }

    return typeof cell === 'number' ? seed : seed + cell
  }

  getFrameSeed() {
    return ''
  }

  getPre(text) {
    var pre = document.createElement('pre')
    pre.textContent = text
    return pre
  }
}
