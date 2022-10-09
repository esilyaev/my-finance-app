interface IWeek {
  weekStart: Date,
  weekEnd: Date
}

class CalendarHelper {
  currentDate = new Date()

  GetCurrentWeekStartEnd = () : IWeek => {
     
    const first = this.currentDate.getDate() - this.currentDate.getDay();
    var last = first + 6;

    return {
      weekStart: new Date(this.currentDate.setDate(first)),
      weekEnd: new Date(this.currentDate.setDate(last))
    }
  }
}

export default new CalendarHelper()