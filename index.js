import Game from './src/Game.js'
import RenderingEngine from './src/Renderer/Engines/DOMString'

const big = `
BsU__________________WsS
________b________wwww___
____________________w___
_____RsP____________wwww
_______________________w
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
  'w': Game.Blocks.ICONS.Wall,
  'B': Game.Blocks.NOUNS.Baba,
  'R': Game.Blocks.NOUNS.Rock,
  'W': Game.Blocks.NOUNS.Wall,
  's': Game.Blocks.JOINERS.Is,
  'P': Game.Blocks.PROPERTIES.Push,
  'S': Game.Blocks.PROPERTIES.Stop,
  'U': Game.Blocks.PROPERTIES.You
},
new RenderingEngine(new RenderingEngine()))

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
function render() {
  game.render()
  requestAnimationFrame(render)
}
