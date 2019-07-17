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
BsU___Fs!
__b___f__
_________
`

var engine = new RenderingEngine(new RenderingEngine())
var game = new Game([smol], engine)

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
