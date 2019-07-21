import Level from './Base.js'

export default class Level_00 extends Level {
  getMap() {
    return `
BsU_____Fs!
___________
wwwwwwwwwww
_____r_____
_b___r___f_
_____r_____
wwwwwwwwwww
___________
WsS_____RsP
`
  }

  getLegend() {
    return {
      _: this.Blocks.BLANK,
      B: this.Blocks.NOUNS.Baba,
      F: this.Blocks.NOUNS.Flag,
      W: this.Blocks.NOUNS.Wall,
      R: this.Blocks.NOUNS.Rock,
      b: this.Blocks.ICONS.Baba,
      f: this.Blocks.ICONS.Flag,
      w: this.Blocks.ICONS.Wall,
      r: this.Blocks.ICONS.Rock,
      s: this.Blocks.JOINERS.Is,
      U: this.Blocks.PROPERTIES.You,
      S: this.Blocks.PROPERTIES.Stop,
      P: this.Blocks.PROPERTIES.Push,
      '!': this.Blocks.PROPERTIES.Win
    }
  }
}
