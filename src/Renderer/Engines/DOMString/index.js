import EngineBase from '../Base.js'
import Renderer from '../../../Renderer'

const blocks = {
  noun: {
    Baba: 'B',
    Rock: 'R',
    Wall: 'W',
    Flag: 'F',
    Skull: 'K'
  },
  icon: {
    Baba: 'b',
    Rock: 'r',
    Wall: 'w',
    Flag: 'f',
    Skull: 'k'
  },
  joiner: {
    Is: 's',
    And: '&'
  },
  property: {
    You: 'U',
    Push: 'P',
    Stop: 'S',
    Win: '!',
    Defeat: 'X'
  }
}

export default class DOMString extends EngineBase {
  beforeRender() {
    document.querySelector('#game pre').textContent = ''
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
      this.renderGrid(seed)
      return seed
    }

    return typeof cell === 'number' ? seed : seed + cell
  }

  getFrameSeed() {
    return ''
  }

  renderGrid(grid) {
    var pre = document.querySelector('#game pre')
    pre.textContent = grid
  }
}
