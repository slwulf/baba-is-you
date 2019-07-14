import Rule from './Rule.js'

export default {
  getObjectsForMap(mapStr = '', legend = {}) {
    return this.splitMapString(mapStr)
      .map((row, i) => row.map((char, j) => {
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
        return {x, y: y-1}
      case 'Right':
        return {x, y: y+1}
      case 'Up':
        return {x: x-1, y}
      case 'Down':
        return {x: x+1, y}
    }
  },
  sanitizeMapString(mapStr) {
    return mapStr.trim().replace(/[^\S\r\n]/g, '')
  },
  splitMapString(mapStr) {
    return mapStr.trim().split('\n').map(l => l.trim().split(''))
  }
}