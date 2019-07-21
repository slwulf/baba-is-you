import Level from './Base.js'

export default class Level_03 extends Level {
  getMap() {
    return `
BWw_______________
ssw____wwwwwwww___
USw____w______w___
www____w_b__r_w___
______Hw______w___
______sw____r_w___
______@w______w___
____wwwwhhhwwwwwww
____w______w_____w
____w______w_RsP_w
____w______w_____w
____whhh_w_______w
____whhh___w_Fs!_w
____wfhh___w_____w
____wwwwwwwwwwwwww
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
      b: this.Blocks.ICONS.Baba,
      f: this.Blocks.ICONS.Flag,
      w: this.Blocks.ICONS.Wall,
      r: this.Blocks.ICONS.Rock,
      h: this.Blocks.ICONS.Water,
      s: this.Blocks.JOINERS.Is,
      U: this.Blocks.PROPERTIES.You,
      S: this.Blocks.PROPERTIES.Stop,
      P: this.Blocks.PROPERTIES.Push,
      '@': this.Blocks.PROPERTIES.Sink,
      '!': this.Blocks.PROPERTIES.Win
    }
  }
}
