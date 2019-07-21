import Game from './src/Game.js'
import Engines_DOMString from './src/Renderer/Engines/DOMString'
import Engines_DOM from './src/Renderer/Engines/DOM'

var game = new Game(new Engines_DOM())

game.setKeyBindings((handler, INPUTS) => {
  var keys = {
    'ArrowLeft': INPUTS.LEFT,
    'ArrowRight': INPUTS.RIGHT,
    'ArrowUp': INPUTS.UP,
    'ArrowDown': INPUTS.DOWN,
    'z': INPUTS.UNDO,
    'x': INPUTS.RESET
  }

  document.body.addEventListener('keydown', ({key}) => {
    console.clear()
    var input = keys[key]
    handler(input)
  })
})

game.start()
