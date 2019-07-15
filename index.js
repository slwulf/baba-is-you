import Game from './src/Game.js'
import RenderingEngine from './src/Renderer/Engines/DOMString'

const big = `
BsU__________________RsP
________________________
________________________
___b_r_r________________
________________________
___________________r____
________________________
`

const smol = `
BsU___RsP
___br_r__
_________
`

// when parsing levels, first line is assumed to be
// level title or whitespace
var game = new Game([
  big
], {
  '_': Game.Blocks.BLANK,
  'b': Game.Blocks.ICONS.Baba,
  'r': Game.Blocks.ICONS.Rock,
  'B': Game.Blocks.NOUNS.Baba,
  'R': Game.Blocks.NOUNS.Rock,
  's': Game.Blocks.JOINERS.Is,
  'P': Game.Blocks.PROPERTIES.Push,
  'U': Game.Blocks.PROPERTIES.You
},
new RenderingEngine())

document.body.addEventListener('keyup', event => {
  console.clear()
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
