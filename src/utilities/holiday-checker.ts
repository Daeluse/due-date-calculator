import { DAILY_OFFSET } from '../globals';
import { DateInfo } from "./date-info";

export class HolidayChecker {

  private _collector = [
    this._isNewYearsDay,
    this._isMLKDay,
    this._isPresidentDay,
    this._isMemorialDay,
    this._isJuneteenth,
    this._isIndependenceDay,
    this._isLaborDay,
    this._isColumbusDay,
    this._isVeteransDay,
    this._isThanksgivingDay,
    this._isChristmasDay,
  ];

  constructor(
    public dateInfo: DateInfo,
  ) { }

  public isHoliday(date: Date): boolean {
    let result: boolean = this._collector.reduce((acc, curr) => {
      if (acc === false) {
        let result = curr.bind(this)(date);
        acc = result;
      }
      return acc;
    }, false);

    if (!result && date.getDay() === 1) {
      // If a Holiday falls on a Sunday, it is observed the following Monday
      result = this.isHoliday(new Date(date.getTime() - DAILY_OFFSET));
    } else if (!result && date.getDay() === 5) {
      // If a Holiday falls on a Saturday, is is observed the preceeding Friday
      result = this.isHoliday(new Date(date.getTime() + DAILY_OFFSET));
    }

    // Coalesced result
    return result;
  }

  public _isNewYearsDay(date: Date): boolean {
    if (date.getMonth() !== 0 || date.getDate() !== 1) {
      return false; // Assert exact day
    }

    return true;
  }

  public _isMLKDay(date: Date): boolean {
    if (date.getMonth() !== 0) {
      return false; // Assert January as Month
    } else if (!this._isNthDayOfMonth(date, 1, 3)) {
      return false; // Assert third week containg Monday in month
    } else if (date.getDay() !== 1) {
      return false; // Assert day is Monday
    }

    return true;
  }

  public _isPresidentDay(date: Date): boolean {
    if (date.getMonth() !== 1) {
      return false; // Assert February as Month
    } else if (!this._isNthDayOfMonth(date, 1, 3)) {
      return false; // Assert third week containing Monday in month
    } else if (date.getDay() !== 1) {
      return false; // Assert day is Monday
    }

    return true;
  }

  public _isMemorialDay(date: Date): boolean {
    const dInfo = this.dateInfo.getDateInfo(date);

    if (date.getMonth() !== 4) {
      return false; // Assert May as Month
    } else if (dInfo.lastDayOfMonth < 1
      ? (dInfo.currentWeek !== dInfo.weeksInMonth - 1)
      : (dInfo.currentWeek !== dInfo.weeksInMonth)) {
      return false; // Assert last week containing Monday in month
    } else if (date.getDay() !== 1) {
      return false; // Assert day is Monday
    }

    return true;
  }

  public _isJuneteenth(date: Date): boolean {
    if (date.getMonth() !== 5 || date.getDate() !== 19) {
      return false; // Assert exact day
    }

    return true;
  }

  public _isIndependenceDay(date: Date): boolean {
    if (date.getMonth() !== 6 || date.getDate() !== 4) {
      return false; // Assert exact day
    }

    return true;
  }

  public _isLaborDay(date: Date): boolean {
    if (date.getMonth() !== 8) {
      return false; // Assert September as Month
    } else if (!this._isNthDayOfMonth(date, 1, 1)) {
      return false; // Assert first week containing Monday in month
    } else if (date.getDay() !== 1) {
      return false; // Assert day is Monday
    }

    return true;
  }

  public _isColumbusDay(date: Date): boolean {
    if (date.getMonth() !== 9) {
      return false; // Assert October as Month
    } else if (!this._isNthDayOfMonth(date, 1, 2)) {
      return false; // Assert second week containing Monday in month
    } else if (date.getDay() !== 1) {
      return false; // Assert day is Monday
    }

    return true;
  }

  public _isVeteransDay(date: Date): boolean {
    if (date.getMonth() !== 10 || date.getDate() !== 11) {
      return false; // Assert exact day
    }

    return true;
  }

  public _isThanksgivingDay(date: Date): boolean {
    if (date.getMonth() !== 10) {
      return false; // Assert November as Month
    } else if (!this._isNthDayOfMonth(date, 4, 4)) {
      return false; // Assert fourth week containing Thursday in month
    } else if (date.getDay() !== 4) {
      return false; // Assert day is Thursday
    }

    return true;
  }

  public _isChristmasDay(date: Date): boolean {
    if (date.getMonth() !== 11 || date.getDate() !== 25) {
      return false; // Assert exact day
    }

    return true;
  }

  public _isNthDayOfMonth(date: Date, day: number, week: number): boolean {
    const dInfo = this.dateInfo.getDateInfo(date);

    if (dInfo.firstWeekday > day
      ? (dInfo.currentWeek !== week + 1)
      : (dInfo.currentWeek !== week)) {
      return false; // Assert nth week containing day in month
    }

    return true;
  }
}