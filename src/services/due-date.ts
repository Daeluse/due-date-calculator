import { DAILY_OFFSET } from "../globals";
import { HolidayChecker } from "../utilities/holiday-checker";

const WORKING_HOURS = [
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
];
const WORKING_DAYS = [
  1,
  2,
  3,
  4,
  5,
];

export class DueDateService {

  constructor(
    public holidayChecker: HolidayChecker
  ) { }

  public CalculateDueDate(
    submission: Date,
    duration: number,
  ): Date {
    // If the submission falls outside of working hours, it will be post-dated
    // for the next valid submission time
    if (!this._isWorkingDay(submission)) {
      submission = this._getNextWorkingDate(submission);
      submission.setHours(9, 0, 0, 0);
    }

    // Create some local variables for idempotency
    let tmpDate = submission;
    let tmpDuration = duration;

    // We will use the remaining duration for recursion
    while (tmpDuration > 0) {
      // Used to determine if submission will be completed in current working day
      const hoursLeftInDay = this._getWorkingHoursLeftInDay(tmpDate);
      if (hoursLeftInDay < tmpDuration) {
        // If it will NOT be completed in current working day, go to next working day
        tmpDate = this._getNextWorkingDate(tmpDate);
        tmpDate.setHours(WORKING_HOURS[0], 0, 0, 0);
        tmpDuration = tmpDuration - hoursLeftInDay;
      } else {
        // Increment the time from the start of the working day based on remaining duration
        const hours = tmpDate.getHours() + Math.floor(tmpDuration);
        const minutes = tmpDate.getMinutes() + (tmpDuration - Math.floor(tmpDuration)) * 60;
        tmpDate.setHours(hours, minutes, 0, 0);
        tmpDuration = 0;
      }
    }

    return tmpDate;
  }

  public _getNextWorkingDate(date: Date): Date {
    let workingDate: Date | undefined = undefined;

    while (workingDate == null) {
      date = new Date(date.getTime() + DAILY_OFFSET);

      if (!this._isWorkingDay(date)) {
        continue;
      }

      workingDate = date;
    }

    return workingDate;
  }

  public _isWorkingDay(date: Date): boolean {
    return WORKING_DAYS.includes(date.getDay()) && !this.holidayChecker.isHoliday(date);
  }

  public _getWorkingHoursLeftInDay(date: Date): number {
    const endOfDay = new Date(date);
    endOfDay.setHours(WORKING_HOURS[WORKING_HOURS.length - 1], 0, 0, 0);
    return (endOfDay.getTime() - date.getTime()) / 1000 / 60 / 60;
  }

}