import Game from './src/Game.js'
import RenderingEngine from './src/Renderer/Engines/DOMString'

var game = new Game(new RenderingEngine())

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
