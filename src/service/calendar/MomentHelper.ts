import moment from "moment";
import "moment/dist/locale/ru";

class MomentHelper {

  m = moment

  constructor() {
    this.m.locale('ru') 
  }

  getDayOfWeekName = (date: Date) => {
    return this.m(date).format('dddd')
  }

  getFormatDate = (date: Date) => {
    return this.m(date).format('LL')
  }

  getDayOfWeekNameUntil = (start: Date, amount: any, unit: any) => {
    return this.m(start).add(amount, unit).format('dddd')
  }

  getDateUntil = (start: Date, amount, unit) => {
    return this.m(start).add(amount, unit)

  }
}

export default new MomentHelper()