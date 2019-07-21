import Level from './Base.js'

export default class Level_04 extends Level {
  getMap() {
    return `
Fs!_____________________
BsU_____________________
________________________
_____________kkkkkkkkk__
_____________k_______k__
__RsP________k_K_____k__
_____________k_s_____k__
_____k_k_____k_X_____k__
_____krk_____k_______k__
___kkkrkkk___k____f__k__
___k__r__k___k_______k__
___k_____k___kkkkkkkkk__
___k__b__k______________
___k_____k______________
`
  }

  getLegend() {
    return {
      _: this.Blocks.BLANK,
      B: this.Blocks.NOUNS.Baba,
      F: this.Blocks.NOUNS.Flag,
      W: this.Blocks.NOUNS.Wall,
      R: this.Blocks.NOUNS.Rock,
      K: this.Blocks.NOUNS.Skull,
      b: this.Blocks.ICONS.Baba,
      f: this.Blocks.ICONS.Flag,
      w: this.Blocks.ICONS.Wall,
      r: this.Blocks.ICONS.Rock,
      k: this.Blocks.ICONS.Skull,
      s: this.Blocks.JOINERS.Is,
      U: this.Blocks.PROPERTIES.You,
      P: this.Blocks.PROPERTIES.Push,
      X: this.Blocks.PROPERTIES.Defeat,
      '!': this.Blocks.PROPERTIES.Win
    }
  }
}
