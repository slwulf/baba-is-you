import Base from './Base'
import {TYPES} from '../Constants.js'

export default class Blank extends Base {
  get name() {
    return "Blank"
  }
  initialize() {
    this.setType(TYPES.BLANK)
  }
}
