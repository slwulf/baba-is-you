import Level from './Base.js'

export default class Level_06 extends Level {
  getMap() {
    return `
RsS__r_______k___________
_____r_____wwkwwwwwww____
KsX__r_____w_k__w___w____
_____r_____w_k____f_w____
Fs!__r_wwwww_k__w___w____
_____r_w___w_k__wwwww____
rrrrrr_w_b___kwww________
_______w___w_kkkkkkkkkkkk
_______wwwww____w________
___________w_WsSw________
_________B_w____w________
_________s_wwwwww________
_________U_______________
_________________________
`
  }

  getLegend() {
    return {
      _: this.Blocks.BLANK,
      B: this.Blocks.NOUNS.Baba,
      F: this.Blocks.NOUNS.Flag,
      W: this.Blocks.NOUNS.Wall,
      R: this.Blocks.NOUNS.Rock,
      H: this.Blocks.NOUNS.Water,
      K: this.Blocks.NOUNS.Skull,
      b: this.Blocks.ICONS.Baba,
      f: this.Blocks.ICONS.Flag,
      w: this.Blocks.ICONS.Wall,
      r: this.Blocks.ICONS.Rock,
      h: this.Blocks.ICONS.Water,
      k: this.Blocks.ICONS.Skull,
      s: this.Blocks.JOINERS.Is,
      U: this.Blocks.PROPERTIES.You,
      S: this.Blocks.PROPERTIES.Stop,
      P: this.Blocks.PROPERTIES.Push,
      X: this.Blocks.PROPERTIES.Defeat,
      '@': this.Blocks.PROPERTIES.Sink,
      '!': this.Blocks.PROPERTIES.Win
    }
  }
}
