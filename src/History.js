import Util from './Util.js'
import {LEGEND} from './Constants.js'

export default function History() {
  const commits = []
  let blocksCoveredByMovedIcons = []
  let legend = LEGEND

  return {
    push(change) {
      commits.push(change)
    },

    revert(count = -1) {
      if (count < 0) {
        commits.splice(1, commits.length)
      } else if (commits.length > count) {
        commits.splice(commits.length - count)
      }
    },

    applyChanges(diff) {
      var coveredBlocks = []
      var last = Util.splitMapString(this.last)
      var newState = diff.reduce((state, delta) => {
        var fromBlock = state[delta.from.x][delta.from.y]
        var toBlock = state[delta.to.x][delta.to.y]

        if (!delta.to.destroyed) {
          coveredBlocks.push({
            x: delta.to.x,
            y: delta.to.y,
            char: toBlock
          })
        }

        var prevFrom = this.getPrevBlock(delta.from)
        var prevTo = this.getPrevBlock(delta.to)

        state[delta.to.x][delta.to.y] = this.getNewTo(delta, fromBlock, toBlock)
        state[delta.from.x][delta.from.y] = this.getNewFrom(delta, fromBlock, toBlock)
        return state;
      }, last)

      this.push(
        newState.map(l => l.join('')).join('\n')
      )
      // TODO: merge these arrays so that still-covered blocks stay covered
      blocksCoveredByMovedIcons = coveredBlocks
    },

    getNewFrom(delta, fromBlock, toBlock) {
      return this.getPrevBlock(delta.from) || this.BLANK
    },

    getNewTo(delta, fromBlock, toBlock) {
      return delta.from.destroyed ? toBlock : fromBlock
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
    },

    get legend() {
      return legend
    },

    set legend(val) {
      legend = val
    },

    get BLANK() {
      return Util.getKeyForValue(this.legend, val => {
        return val.name === 'Blank'
      })
    }
  }
}

History.of = function(initialState) {
  const hist = History()
  hist.push(initialState)
  return hist
}
