import Level from './Base.js'

export default class Level_05 extends Level {
  getMap() {
    return `
WsSll_w_____w___w___lllllll_______
llll__w_______b_w__lllllll________
ll____w_____w___w__llllll_________
l_____w_BsU_wwwww_lllllll_________
______ww___ww_____llllll__________
______w_____r_____llllll__________
______wwwwwww____lllllll__________
______wRw________llllll___________
_______s_________llllll___________
_______P________lllllll___________
____________L___llllll____________
_______________llllll_____________
_______wBsMw___llllll_____f_______
_______wwwww__llllll______________
_______wLsHw__lllll______Fs!______
_______wwwww_llllll______________l
____________llllll______________ll
___________lllllll_____________lll
`
  }

  getLegend() {
    return {
      _: this.Blocks.BLANK,
      B: this.Blocks.NOUNS.Baba,
      F: this.Blocks.NOUNS.Flag,
      W: this.Blocks.NOUNS.Wall,
      R: this.Blocks.NOUNS.Rock,
      L: this.Blocks.NOUNS.Lava,
      b: this.Blocks.ICONS.Baba,
      f: this.Blocks.ICONS.Flag,
      w: this.Blocks.ICONS.Wall,
      r: this.Blocks.ICONS.Rock,
      l: this.Blocks.ICONS.Lava,
      s: this.Blocks.JOINERS.Is,
      U: this.Blocks.PROPERTIES.You,
      S: this.Blocks.PROPERTIES.Stop,
      P: this.Blocks.PROPERTIES.Push,
      M: this.Blocks.PROPERTIES.Melt,
      H: this.Blocks.PROPERTIES.Hot,
      '!': this.Blocks.PROPERTIES.Win
    }
  }
}
