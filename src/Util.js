import Rule from './Rule.js'
import {LEGEND, EFFECTS, INPUTS} from './Constants.js'

export default {
  createObjectGrid(mapStr = '', legend = LEGEND) {
    var grid = this.splitMapString(mapStr)
      .map((row, i) => row.map((char, j) => {
        var Block = legend[char]
        if (typeof Block !== 'function') {
          throw new Error(`Could not find Block constructor in legend for "${char}"`)
        }
        return new Block(i, j)
      }))
    return grid;
  },
  getObjectsForMap(mapStr = '', legend = LEGEND) {
    var grid = this.createObjectGrid(mapStr, legend)
    var rules = this.getDefinedRules(grid)
    return grid.map(row => row.map(block => this.applyRules(block, rules)))
  },
  getRulesForMap(mapStr = '', legend = LEGEND) {
    var grid = this.createObjectGrid(mapStr, legend)
    return this.getDefinedRules(grid)
  },
  applyRules(block, rules) {
    if (!block.isIcon()) return block
    rules.forEach(rule => {
      if (block.name === rule.target.name) {
        rule.properties.forEach(p => {
          if(p.isProperty()) {
            block.addProperty(p)
          }
        })
      }
    })
    return block
  },
  playerIsDefined(rules) {
    return rules.reduce((isYou, rule) => {
      return isYou || rule.hasProperty(EFFECTS.YOU)
    }, false)
  },
  getDefinedRules(grid) {
    return this.getRulesFromRows(grid).concat(
      this.getRulesFromCols(grid)
    )
  },
  getRulesFromRows(grid) {
    return grid.flatMap(row => Rule.fromArray(row) || [])
  },
  getRulesFromCols(grid) {
    var cols = grid[0].map((_, y) =>
      grid.map((__, x) => grid[x][y]))

    return this.getRulesFromRows(cols)
  },
  getBlockAtPosition(grid, {x, y}) {
    return grid[x] ? (grid[x][y] || null) : null
  },
  getNextPosition({x,y}, input) {
    switch (input) {
      case INPUTS.LEFT:
        return {x, y: y-1}
      case INPUTS.RIGHT:
        return {x, y: y+1}
      case INPUTS.UP:
        return {x: x-1, y}
      case INPUTS.DOWN:
        return {x: x+1, y}
    }
  },
  getDirectionFromMoveDelta(move) {
    var dX = move.to.x - move.from.x
    var dY = move.to.y - move.from.y

    return dX === 0
      ? (dY > 0 ? INPUTS.RIGHT : INPUTS.LEFT)
      : (dX > 0 ? INPUTS.DOWN : INPUTS.UP)
  },
  getDistanceBetweenPositions(pos1, pos2) {
    // this assumes a straight line because blocks
    // can only move in one direction at a time
    return pos1.x !== pos2.x
      ? Math.abs(pos1.x - pos2.x)
      : Math.abs(pos1.y - pos2.y)
  },
  sortMoves(moves, direction) {
    var sorted = moves.sort((move1, move2) => {
      switch (direction) {
        // Sort left to right.
        case INPUTS.LEFT:
          if (
            move1.from.x < move2.from.x ||
            ((move1.from.x === move2.from.x) &&
            move1.from.y < move2.from.y)
          ) return -1
          if (
            move1.from.x < move2.from.x ||
            ((move1.from.x === move2.from.x) &&
            move1.from.y > move2.from.y)
          ) return 1
        // Sort right to left.
        case INPUTS.RIGHT:
          if (
            move1.from.x < move2.from.x ||
            ((move1.from.x === move2.from.x) &&
            move1.from.y > move2.from.y)
          ) return -1
          if (
            move1.from.x < move2.from.x ||
            ((move1.from.x === move2.from.x) &&
            move1.from.y < move2.from.y)
          ) return 1
        // Sort top to bottom.
        case INPUTS.UP:
          if (
            move1.from.y < move2.from.y ||
            ((move1.from.y === move2.from.y) &&
            move1.from.x < move2.from.x)
          ) return -1
          if (
            move1.from.y > move2.from.y ||
            ((move1.from.y === move2.from.y) &&
            move1.from.x > move2.from.x)
          ) return 1
        // Sort bottom to top.
        case INPUTS.DOWN:
          if (
            move1.from.y < move2.from.y ||
            ((move1.from.y === move2.from.y) &&
            move1.from.x > move2.from.x)
          ) return -1
          if (
            move1.from.y > move2.from.y ||
            ((move1.from.y === move2.from.y) &&
            move1.from.x < move2.from.x)
          ) return 1
      }
      return 0
    })
    return sorted

  },
  deduplicateMoves(moves) {
    var deduped = []
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      if (!this.arrayContainsObject(deduped, move)) {
        deduped.push(move)
      }
    }
    return deduped
  },
  sanitizeMapString(mapStr) {
    return mapStr.trim().replace(/[^\S\r\n]/g, '')
  },
  splitMapString(mapStr) {
    return mapStr.trim().split('\n').map(l => l.trim().split(''))
  },
  arrayContainsObject(arr, obj) {
    return !!arr.find(item => {
      if (typeof item !== 'object') return false
      return this.objectsAreEqual(item, obj)
    })
  },
  objectsAreEqual(obj1 = {}, obj2 = {}) {
    return Object.keys(obj1).every(k => {
      return JSON.stringify(obj1[k]) === JSON.stringify(obj2[k])
    })
  },
  getKeyForValue(obj, test) {
    return Object.keys(obj).reduce((result, key) => {
      return result || (test(obj[key]) ? key : result)
    }, undefined)
  },
  pauseForAction(ms, action) {
    return new Promise(resolve => {
      setTimeout(() => resolve(action()), ms)
    })
  }
}