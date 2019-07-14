import Game from './src/Game.js'

// when parsing levels, first line is assumed to be
// level title or whitespace
var game = new Game([
  `
  __________
  _BsU______
  __________
  b_________
  __________
  `
], {
  '_': Game.Blocks.BLANK,
  'b': Game.Blocks.ICONS.Baba,
  'B': Game.Blocks.NOUNS.Baba,
  's': Game.Blocks.JOINERS.Is,
  'U': Game.Blocks.PROPERTIES.You
})

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

requestAnimationFrame(render)

function render() {
  var $level = document.querySelector('pre')
  var state = game.getCurrentState()
  if (state !== $level.innerText) {
    $level.innerText = game.getCurrentState()
  }
  requestAnimationFrame(render)
}
