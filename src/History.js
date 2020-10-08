import Util from './Util.js'
import {LEGEND} from './Constants.js'

export default function History() {
  const commits = []
  let coveredBlocks = []
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
      var last = Util.splitMapString(this.last)
      var newState = diff.reduce((state, delta) => {
        var fromBlock = state[delta.from.x][delta.from.y]
        var toBlock = state[delta.to.x][delta.to.y]

        if (!delta.to.destroyed) {
          this.coverBlock({
            x: delta.to.x,
            y: delta.to.y,
            char: toBlock
          })
        }

        state[delta.to.x][delta.to.y] = this.getNewTo(delta, fromBlock, toBlock)
        state[delta.from.x][delta.from.y] = this.getNewFrom(delta, fromBlock, toBlock)

        return state;
      }, last)

      // Create a new map.
      var newMap = newState.map(l => l.join('')).join('\n')
      // Get rules which will transform blocks.
      var rules = Util.getRulesForMap(newMap, this.legend)
      var transformRules = rules.filter( rule => rule.hasNounProperty() )
      var transformedMap = transformRules.reduce((map, rule) => {
        // For now transforming one block into two is not supported.
        var prop = rule.nounProperties()[0]
        var propBlockCode = Util.getKeyForValue(this.legend, val => {
          return val === prop.iconBlock()
        })
        var target = rule.target
        var targetBlockCode = Util.getKeyForValue(this.legend, val => {
          return val === target.iconBlock()
        })
        return map.replaceAll(targetBlockCode, propBlockCode)
      }, newMap)
      console.log(transformedMap)

      this.push(transformedMap)
    },

    coverBlock(block) {
      if (
        block.char !== this.BLANK &&
        !Util.arrayContainsObject(coveredBlocks, block)
      ) {
        coveredBlocks.push(block)
      }
    },

    getNewFrom(delta, fromBlock, toBlock) {
      return this.getPrevBlock(delta.from) || this.BLANK
    },

    getNewTo(delta, fromBlock, toBlock) {
      if (delta.to.destroyed) {
        return this.getPrevBlock(delta.to) || this.BLANK
      }

      return delta.from.destroyed ? toBlock : fromBlock
    },

    getPrevBlock({x, y}) {
      var index = coveredBlocks.findIndex(block => {
        return block.x === x && block.y === y
      })

      // if we're looking up a prev block, and one exists
      // it's no longer covered
      if (index > -1) {
        let [prev] = coveredBlocks.splice(index, 1)
        return prev.char
      }

      return null
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
