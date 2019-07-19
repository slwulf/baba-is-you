import Game from './src/Game.js'
import RenderingEngine from './src/Renderer/Engines/DOMString'

const big = `
BsUw________________wFs!
wwww____b___________wwww
_________________r______
_____RsP________________
________________________
rrrrrrrrr_______________
________________________
__f_________________wwww
____________________wWsS
`

const smol = `
BsU___Fs!
__b___f__
_________
`

const levels = [
`
BsU_____Fs!
___________
wwwwwwwwwww
_____r_____
_b___r___f_
_____r_____
wwwwwwwwwww
___________
WsS_____RsP
`,
smol,
big
]

const debugLevels = [smol]

var engine = new RenderingEngine(new RenderingEngine())
var game = new Game(levels, engine)

var keys = {
  'ArrowLeft': Game.Keys.LEFT,
  'ArrowRight': Game.Keys.RIGHT,
  'ArrowUp': Game.Keys.UP,
  'ArrowDown': Game.Keys.DOWN,
  'z': Game.Keys.UNDO,
  'x': Game.Keys.RESET
}

game.setKeyBindings(keys, handler => {
  document.body.addEventListener('keyup', event => {
    console.clear()
    handler(event.key)
  })
})

game.start()
