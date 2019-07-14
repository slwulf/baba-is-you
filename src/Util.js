import Rule from './Rule.js'

export default {
  getObjectsForMap(map = '', legend = {}) {
    return map.trim().split('\n')
      .map((row, i) => row.trim().split('').map((char, j) => {
        var Block = legend[char]
        if (typeof Block !== 'function') {
          throw new Error(`Could not find Block constructor in legend for "${char}"`)
        }
        return new Block(i, j)
      }))
  },
  getRulesFromRows(grid) {
    return grid.flatMap(row => Rule.fromArray(row) || [])
  },
  getRulesFromCols(grid) {
    return []
  },
  getNextPosition({x,y}, input) {
    switch (input) {
      case 'Left':
        return {x: x-1, y}
      case 'Right':
        return {x: x+1, y}
      case 'Up':
        return {x, y: y-1}
      case 'Down':
        return {x, y: y+1}
    }
  }
}