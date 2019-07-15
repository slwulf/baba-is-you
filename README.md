# Baba Is You

#### TODO
- debug pushable objects
  - when pushing a chain, player steps between first and second items and ends up pushing second
  - see Game#determineLegalMoves
- debug player movement
  - when player steps on a non-movable icon, the icon disappears
- add key binding interface to game object (like renderer)

## Game Objects

All of these take up one grid space of a level. Icons have no collision by default. Words have collision and can always be pushed.

- **Icons:** baba, rock, crab, jelly, wall, flag, key, door, etc
- **Nouns:** BABA, ROCK, etc (for every Icon there is a Noun)
- **Joiners:** IS, AND (are there others?)
- **Properties:** YOU, PUSH, STOP, WIN, DEFEAT, etc

## Rules

1. Nouns combine with Joiners and Properties to affect Icons.
2. Noun + IS + Property = Icon matching noun has property
3. Noun + IS + Property + AND + Property = Icons matching noun have any properties chained on by any number of ANDs
4. Noun + IS + Noun = Icons matching noun 1 turn into noun 2
5. Icons have no Properties unless a rule is defined by one of the above
   three combinations
6. Rules can only be defined top to bottom or left to right
7. If an Icon is transformed by a rule, the Nouns that made the rule
   cannot be used to transform said icon back to its original state
8. A level must always have a YOU block. If there are no Nouns connected
   to a YOU block, the player cannot move.
9. All moves can be undone, and all levels can be reset.

## Properties

- YOU: the ur-property; if NOUN IS YOU is aligned, the player controls
  all icons matching any noun connected to YOU
- STOP: icons have collision
- PUSH: icons have collision but can be pushed by the player
- WIN: if the player touches an icon whose Noun is WIN, the the player wins
- DEFEAT: if a player Icon touches an icon whose Noun is DEFEAT, the icon that
  touched it is destroyed.

## Implementation Notes

user input moves the player icon(s) and we check what block is in that direction. look at the block's properties, determine if the icon is allowed to move to that space, and make changes to the surrounding blocks (this sounds wayyyy simpler than it actually is but)

thoughts for how state might look:
- grid state is kept in a string based on what comes in. a legend object is kept as well to translate map to objects easily
- theoretically everything else can be determined from that, right?
- also need a history of state changes to enable undo, which is essentially "just" keeping a diff history of the map string, but what does that look like
  - could be that game state is an array of strings representing the first to the Nth move made, each string being the entire map, and restting clears the array except for the first element, which is the map's initial state
  - this would make undo as simple as removing the last move made
  - would probably have to make this memory efficient by only storing the diff between each state at some point -- not sure how to best represent this

how about updating state?
- state can change in the following ways:
  1. player presses a directional input and it produces a legal move
  2. a block must move as a result of a player's legal move
  3. a block must move as a result of another block's legal move
  4. player presses undo or reset
- because of this, none of the rules defined in a level will be in effect until the player makes their first move. this means any NOUN IS NOUN instances will transform icons after the first move
- while determining final state, queue each state change as it happens as in many cases one action will have ripple effects that require multiple state changes. then you can iterate over them to get the final state change, which gets stored in history. (this also kinda gives us diffs for free, because here we can store just each successive diff after the initial state and apply them or unapply them)

so how do we determine how state changes in those cases?
1. player movement
  - find the position(s) of any player icons on the map
  - for each player icon, check the adjacent square in the input direction for a block
  - if there is no block, player icon moves to that square
  - if block, check the block's properties based on defined rules and determine if player can move to the square
    - if yes, move player icon to that square
    - if the block was pushable, queue step 2 w/ the same directional input & the block's original position
2. block movement (player-induced)
  - given the original position of the block and the direction it moved...
  - basically follow the procedures for step 1, except instead of player icon lookup u already know where to look
1. block movement (block-induced)
  - same thing as step 2
4. undo/reset
  - if undo, step back one place in history and rerender. the next time the player makes a move, overwrite any forward history?
  - if reset, revert the history array to item 0. wipe any forward history?
  - TODO decide what to actually do with forward history in these situations

cool so based on that here's a flowchart of what some game loop might look like

```
initial state: (see legend above)
______
_BsU__
__b___

(0) player presses RIGHT
 |
(*) $[determine game rules, find b, look at next char in dir, translate w/ legend,] it's a space, q move char, update state
 |
(1) player presses UP
 |
(*) $, it's a Word block, q move char, look at next char in dir, it's a space, q move Word, update state
 |
(2) player presses LEFT
 |
(*) determine game rules, see that YOU is not connected, ignore move (side effect: show prompt to undo/reset)
```

with that in mind then, the game loop is:
- ! player input
- determine rules
- determine move(s) and for each:
  - determine legality
  - determine ripple effects & recurse
  - queue state change
- when all moves processed, apply queued state changes

here's what that might look like in a function:

```js
function updateState(state, input) {
  var rules = determineRules(state)
  var moves = determineMoves(state, rules, input)
  var changes = moves.map(move => {
    if (isLegal(move, rules, state)) {
      return getStateChangeDiff(state, move, rules)
    }

    return isLegal(move, rules, state)
      ? getStateChangeDiff(state, move, rules)
      : null
  })

  return changes.reduce(applyStateChange, state)
}
```
