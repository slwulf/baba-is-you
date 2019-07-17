import Blocks from './Blocks'

export const LEGEND = {
  '_': Blocks.BLANK,
  'b': Blocks.ICONS.Baba,
  'r': Blocks.ICONS.Rock,
  'w': Blocks.ICONS.Wall,
  'f': Blocks.ICONS.Flag,
  'k': Blocks.ICONS.Skull,
  'B': Blocks.NOUNS.Baba,
  'R': Blocks.NOUNS.Rock,
  'W': Blocks.NOUNS.Wall,
  'F': Blocks.NOUNS.Flag,
  'K': Blocks.NOUNS.Skull,
  's': Blocks.JOINERS.Is,
  'P': Blocks.PROPERTIES.Push,
  'S': Blocks.PROPERTIES.Stop,
  'U': Blocks.PROPERTIES.You
}

export const EFFECTS = {
  SOLID: 'solid',
  MOVABLE: 'movable',
  YOU: 'you',
  WIN: 'win',
  DEFEAT: 'defeat'
}

export const TYPES = {
  BASE: 'base',
  BLANK: 'blank',
  ICON: 'icon',
  NOUN: 'noun',
  JOINER: 'joiner',
  PROPERTY: 'property'
}
