import Base from './Base'
import {TYPES} from '../Constants.js'

export default class Blank extends Base {
  initialize() {
    this.setType(TYPES.BLANK)
  }
}
