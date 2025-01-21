interface IDateInfo {
  firstWeekday: number;
  lastDateOfMonth: number;
  lastDayOfMonth: number;
  weeksInMonth: number;
  currentWeek: number;
}

export class DateInfo {

  public getDateInfo(date: Date): IDateInfo {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
    const weeksInMonth = 1 + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7);
    const currentWeek = 1 + Math.floor((date.getDate() + firstWeekday - 1) / 7);

    return {
      firstWeekday,
      lastDateOfMonth,
      lastDayOfMonth,
      weeksInMonth,
      currentWeek,
    }
  }

}