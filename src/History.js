import Util from './Util.js'

export default function History() {
  const initialState = ''
  const commits = []
  let blocksCoveredByMovedIcons = []

  return {
    push(change) {
      // if (typeof change === 'string' && commits.length > 0) {
      //   throw new Error('Cannot push string onto initialized history.')
      // }

      // if (typeof change !== 'function' && commits.length > 0) {
      //   throw new Error('History transormation must be of type function.')
      // }

      commits.push(change)
    },

    applyChanges(diff) {
      var coveredBlocks = []
      var last = Util.splitMapString(this.last)
      var newState = diff.reduce((state, delta) => {
        var fromBlock = state[delta.from.x][delta.from.y]
        var toBlock = state[delta.to.x][delta.to.y]
        var prevBlock = this.getPrevBlock(delta.to)
        coveredBlocks.push({
          x: delta.to.x,
          y: delta.to.y,
          char: toBlock
        })
        if (toBlock === 'b') debugger
        state[delta.to.x][delta.to.y] = `${fromBlock}`
        // TODO: use a constant here for "blank" default
        state[delta.from.x][delta.from.y] = `${prevBlock || '_'}`
        return state;
      }, last)

      this.push(
        newState.map(l => l.join('')).join('\n')
      )
      blocksCoveredByMovedIcons = coveredBlocks
    },

    getPrevBlock({x, y}) {
      return blocksCoveredByMovedIcons.reduce((res, block) => {
        if (block.x === x && block.y === y) {
          return block.char
        }

        return res
      }, null)
    },

    get last() {
      return commits[commits.length - 1]
    }
  }
}

History.of = function(initialState) {
  const hist = History()
  hist.push(initialState)
  return hist
}
