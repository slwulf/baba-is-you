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
`
____wwwwwwww
____w______w
____w_s____w
____w______w
wwwww___!__w
w__________w
w_F___f____w
w__________w
wwwwwwwwwwww
____w______w
_B__w_W____w
_s__w_s__b_w
_U__w_S____w
____w______w
____wwwwwwww
`,
`
____ffffffff
____f______f
____f_s____f
____f______f
fffff___!__f
f__________f
f_B________f
f__________f
ffffffffffff
____f______f
_W__f_F____f
_s__f_s__w_f
_U__f_S____f
____f___ffff
____ffff____
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
