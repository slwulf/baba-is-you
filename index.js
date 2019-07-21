import Game from './src/Game.js'
import Engines_DOMString from './src/Renderer/Engines/DOMString'
import Engines_DOM from './src/Renderer/Engines/DOM'

var game = new Game(new Engines_DOM())

var keys = {
  'ArrowLeft': Game.Keys.LEFT,
  'ArrowRight': Game.Keys.RIGHT,
  'ArrowUp': Game.Keys.UP,
  'ArrowDown': Game.Keys.DOWN,
  'z': Game.Keys.UNDO,
  'x': Game.Keys.RESET
}

game.setKeyBindings(keys, handler => {
  document.body.addEventListener('keydown', event => {
    console.clear()
    handler(event.key)
  })
})

game.start()
