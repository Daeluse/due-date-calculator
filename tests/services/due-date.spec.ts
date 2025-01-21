import { DueDateService } from '../../src/services/due-date';
import { DateInfo } from '../../src/utilities/date-info';
import { HolidayChecker } from '../../src/utilities/holiday-checker';

describe('DueDateService', () => {
  let dueDate: DueDateService;

  beforeEach(() => {
    dueDate = new DueDateService(new HolidayChecker(new DateInfo()));
  });

  it('should correctly identify the next available working day', () => {
    const t0 = new Date('01/17/2025');
    const t0_result = dueDate._getNextWorkingDate(t0);
    expect(t0_result).toEqual(new Date('2025-01-21T05:00:00.000Z'));
  });

  it('should correctly get the remaining working hours in a day', () => {
    const t0 = new Date('Tue Jan 21 2025 12:30:00 GMT-0500 (Eastern Standard Time)');
    const t0_result = dueDate._getWorkingHoursLeftInDay(t0);
    expect(t0_result).toEqual(4.5);
  });

  it('should correctly identify a due date', () => {
    const t0 = new Date('Tue Jan 21 2025 12:30:00 GMT-0500 (Eastern Standard Time)');
    const t0_result = dueDate.CalculateDueDate(t0, 8);
    const t0_assert_result = new Date('Wed Jan 22 2025 12:30:00 GMT-0500 (Eastern Standard Time)');
    expect(t0_result).toEqual(t0_assert_result);
  });

  it('should correctly identify a due date over a holiday weekend', () => {
    const t0 = new Date('Fri Jan 17 2025 12:30:00 GMT-0500 (Eastern Standard Time)');
    const t0_result = dueDate.CalculateDueDate(t0, 8);
    const t0_assert_result = new Date('Tue Jan 21 2025 12:30:00 GMT-0500 (Eastern Standard Time)');
    expect(t0_result).toEqual(t0_assert_result);
  });

  it('should correctly identify a due date for a post-marked submission', () => {
    const t0 = new Date('Mon Jan 20 2025 12:30:00 GMT-0500 (Eastern Standard Time)');
    const t0_result = dueDate.CalculateDueDate(t0, 9);
    const t0_assert_result = new Date('Wed Jan 22 2025 10:00:00 GMT-0500 (Eastern Standard Time)');
    expect(t0_result).toEqual(t0_assert_result);
  });

  it('should correctly identify a due date for a short duration', () => {
    const t0 = new Date('Tue Jan 21 2025 13:38:00 GMT-0500 (Eastern Standard Time)');
    const t0_result = dueDate.CalculateDueDate(t0, 1);
    const t0_assert_result = new Date('Tue Jan 21 2025 14:38:00 GMT-0500 (Eastern Standard Time)');
    expect(t0_result).toEqual(t0_assert_result);
  });

  it('should correctly identify a due date for a very long duration', () => {
    const t0 = new Date('Tue Jan 21 2025 09:00:00 GMT-0500 (Eastern Standard Time)');
    const t0_result = dueDate.CalculateDueDate(t0, 33);
    const t0_assert_result = new Date('Mon Jan 27 2025 10:00:00 GMT-0500 (Eastern Standard Time)');
    expect(t0_result).toEqual(t0_assert_result);
  });

  it('should correctly identify a due date between months', () => {
    const t0 = new Date('Fri Feb 28 2025 09:00:00 GMT-0500 (Eastern Standard Time)');
    const t0_result = dueDate.CalculateDueDate(t0, 9);
    const t0_assert_result = new Date('Mon Mar 3 2025 10:00:00 GMT-0500 (Eastern Standard Time)');
    expect(t0_result).toEqual(t0_assert_result);
  });
});