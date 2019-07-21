import Util from './Util.js'

export default class Movement {
  constructor(grid, rules) {
    this.grid = grid
    this.applyProperties(rules)
  }

  getLegalMoves(direction) {
    var playerMoves = this.getPlayerMoves(direction)
    return Util.sortMoves(
      Util.deduplicateMoves(
        this.walkMoves(playerMoves, direction)
      )
    )
  }

  walkMoves(moves, direction, depth = 0) {
    if (moves.length === 0) return moves
    if (depth > moves.length) return moves

    var queue = []
    let firstBlockInChain = null
    var legalMoves = moves.map(move => {
      var fromBlock = Util.getBlockAtPosition(this.grid, move.from)
      var toBlock = Util.getBlockAtPosition(this.grid, move.to)
      var lastBlockInChain = this.getLastBlockInChain(fromBlock, move.to)
      var blockAfterChain = Util.getBlockAtPosition(
        this.grid,
        Util.getNextPosition(lastBlockInChain.position, direction)
      )
      var canMoveFirstBlock = this.blockCanBeMovedTo(fromBlock, move.to)
      var canMoveLastBlock = blockAfterChain
        ? this.blockCanBeMovedTo(lastBlockInChain, blockAfterChain.position)
        : false
      var chainLength = Util.getDistanceBetweenPositions(
        firstBlockInChain ? firstBlockInChain.position : fromBlock.position,
        lastBlockInChain ? lastBlockInChain.position : toBlock.position
      );

      if (firstBlockInChain === null) {
        firstBlockInChain = fromBlock
      }

      if (
        !canMoveFirstBlock ||
        !toBlock ||
        !blockAfterChain ||
        !canMoveLastBlock
      ) return false

      if (lastBlockInChain.isSteppable() || toBlock.isSteppable()) return move

      if (chainLength < queue.length) return move

      if (toBlock && toBlock.isMovable()) {
        var nextMove = {
          from: toBlock.position,
          to: Util.getNextPosition(toBlock.position, direction)
        }

        if (!Util.arrayContainsObject(queue, move)) queue.push(move)
        if (!Util.arrayContainsObject(queue, nextMove)) queue.push(nextMove)
      }
    }).filter(Boolean)

    return legalMoves.concat(this.walkMoves(queue, direction, depth + 1))
  }

  getLastBlockInChain(block, pos) {
    var nextBlock = Util.getBlockAtPosition(this.grid, pos)
    var direction = Util.getDirectionFromMoveDelta({
      from: block.position,
      to: pos
    })

    if (!nextBlock) return block
    if (!nextBlock.isMovable()) return block
    return this.getLastBlockInChain(
      nextBlock,
      Util.getNextPosition(nextBlock.position, direction)
    )
  }

  blockCanBeMovedTo(block, pos) {
    var destination = Util.getBlockAtPosition(this.grid, pos)
    if (!destination) return false
    var nextPos = Util.getNextPosition(destination.position, Util.getDirectionFromMoveDelta({
      from: block.position,
      to: pos
    }))

    if (destination.isSteppable()) return true
    if (destination.isMovable()) {
      return this.blockCanBeMovedTo(destination, nextPos)
    }
  }

  getPlayerMoves(input) {
    return this.getPlayerIcons().map(icon => ({
      from: icon.position,
      to: Util.getNextPosition(icon.position, input)
    }))
  }

  applyProperties(rules) {
    rules.forEach(rule => {
      var icons = this.getIconsForNoun(rule.target)
      icons.forEach(icon => {
        rule.properties.forEach(p => icon.addProperty(p))
      })
    })
  }

  getPlayerIcons() {
    return this.grid.flatMap(row => {
      return row.filter(block => {
        return block.isIcon() && block.isYou()
      })
    })
  }

  getIconsForNoun(noun) {
    return this.grid.flatMap(row => {
      return row.filter(block => block.isIcon() && block.name === noun.name)
    })
  }
}
