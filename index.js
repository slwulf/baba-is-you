import Game from './src/Game.js'
import RenderingEngine from './src/Renderer/Engines/DOMString'

// when parsing levels, first line is assumed to be
// level title or whitespace
var game = new Game([
  `
  __________
  _BsU______
  _____b____
  b_________
  __________
  `
], {
  '_': Game.Blocks.BLANK,
  'b': Game.Blocks.ICONS.Baba,
  'B': Game.Blocks.NOUNS.Baba,
  's': Game.Blocks.JOINERS.Is,
  'U': Game.Blocks.PROPERTIES.You
},
new RenderingEngine())

document.body.addEventListener('keyup', event => {
  var {key} = event
  if (key.indexOf('Arrow') === 0) {
    var direction = key.replace('Arrow', '')
    game.updateState(direction)
  } else if (key === 'z') {
    game.undo()
  } else if (key === 'x') {
    game.reset()
  }
})

render()
// renderWithRenderer()

function render() {
  var $level = document.querySelector('pre')
  var state = game.getCurrentState()
  if (state !== $level.innerText) {
    $level.innerText = game.getCurrentState()
  }
  requestAnimationFrame(render)
}

function renderWithRenderer() {
  game.render()
  setTimeout(renderWithRenderer, 500)
}
