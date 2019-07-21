import EngineBase from '../Base.js'
import Renderer from '../../../Renderer'
import './styles/index.scss'

export default class DOM extends EngineBase {
  accumulateFrame(seed, cell) {
    if (cell === Renderer.SIGNALS.GRID_OPEN) {
      return seed + '<div class="grid">'
    }

    if (cell === Renderer.SIGNALS.LINE_OPEN) {
      return seed + '<div class="row">'
    }

    if (cell === Renderer.SIGNALS.LINE_CLOSE) {
      return seed + '</div>'
    }

    if (cell === Renderer.SIGNALS.GRID_CLOSE) {
      this.lastFrame = seed + '</div>'
      this.renderGrid()
      return this.lastFrame
    }

    return typeof cell === 'number' ? seed : seed + cell
  }

  getFrameSeed() {
    return ''
  }

  renderBlock(block) {
    return `<div class="${this.getBlockClasses(block)}"></div>`
  }

  getBlockClasses(block) {
    var type = block.type.toLowerCase()
    var name = block.name.toLowerCase()
    var classes = [
      'block',
      `block-${type}`,
      `block-${type}--${name}`,
      block.isWin() && 'block--is_win'
    ]
    return classes.filter(Boolean).join(' ')
  }

  renderGrid() {
    var container = document.querySelector('#dom')
    container.innerHTML = this.lastFrame
    this.setGridSize(container)
  }

  renderWinScreen() {
    this.renderGrid()
    document.querySelector('#dom .grid').classList.add('is-win')
  }

  setGridSize(container) {
    var grid = container.querySelector('.grid')
    var blocks = container.querySelectorAll('.grid > .row:first-child > .block')
    grid.style = `max-width: ${blocks.length * blocks[0].offsetWidth}px`
  }
}
