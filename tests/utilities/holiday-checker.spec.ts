import { HolidayChecker } from '../../src/utilities/holiday-checker';
import { DateInfo } from '../../src/utilities/date-info';

describe('HolidayCheckerUtility', () => {
  let dateInfo: DateInfo;
  let holidayChecker: HolidayChecker;

  beforeEach(() => {
    dateInfo = new DateInfo();
    holidayChecker = new HolidayChecker(dateInfo);
  });

  it('should accurately identify New Year\'s Day', () => {
    const t0 = new Date('01/01/2025');
    const t0_result = holidayChecker._isNewYearsDay(t0);
    expect(t0_result).toBeTruthy();
    const t1 = new Date('01/01/2026');
    const t1_result = holidayChecker._isNewYearsDay(t1);
    expect(t1_result).toBeTruthy();
  });

  it('should accurately identify MLK Day', () => {
    const t0 = new Date('01/20/2025');
    const t0_result = holidayChecker._isMLKDay(t0);
    expect(t0_result).toBeTruthy();
    const t1 = new Date('01/19/2026');
    const t1_result = holidayChecker._isMLKDay(t1);
    expect(t1_result).toBeTruthy();
  });

  it('should accurately identify President\'s Day', () => {
    const t0 = new Date('02/17/2025');
    const t0_result = holidayChecker._isPresidentDay(t0);
    expect(t0_result).toBeTruthy();
    const t1 = new Date('02/16/2026');
    const t1_result = holidayChecker._isPresidentDay(t1);
    expect(t1_result).toBeTruthy();
  });

  it('should accurately identify Memorial Day', () => {
    const t0 = new Date('05/26/2025');
    const t0_result = holidayChecker._isMemorialDay(t0);
    expect(t0_result).toBeTruthy();
    const t1 = new Date('05/25/2026');
    const t1_result = holidayChecker._isMemorialDay(t1);
    expect(t1_result).toBeTruthy();
  });

  it('should accurately identify Juneteenth', () => {
    const t0 = new Date('06/19/2025');
    const t0_result = holidayChecker._isJuneteenth(t0);
    expect(t0_result).toBeTruthy();
    const t1 = new Date('06/19/2026');
    const t1_result = holidayChecker._isJuneteenth(t1);
    expect(t1_result).toBeTruthy();
  });

  it('should accurately identify Independence Day', () => {
    const t0 = new Date('07/04/2025');
    const t0_result = holidayChecker._isIndependenceDay(t0);
    expect(t0_result).toBeTruthy();
    const t1 = new Date('07/04/2025');
    const t1_result = holidayChecker._isIndependenceDay(t1);
    expect(t1_result).toBeTruthy();
  });

  it('should accurately identify Labor Day', () => {
    const t0 = new Date('09/01/2025');
    const t0_result = holidayChecker._isLaborDay(t0);
    expect(t0_result).toBeTruthy();
    const t1 = new Date('09/07/2026');
    const t1_result = holidayChecker._isLaborDay(t1);
    expect(t1_result).toBeTruthy();
  });

  it('should accurately identify Columbus Day', () => {
    const t0 = new Date('10/13/2025');
    const t0_result = holidayChecker._isColumbusDay(t0);
    expect(t0_result).toBeTruthy();
    const t1 = new Date('10/12/2026');
    const t1_result = holidayChecker._isColumbusDay(t1);
    expect(t1_result).toBeTruthy();
  });

  it('should accurately identify Veteran\'s Day', () => {
    const t0 = new Date('11/11/2025');
    const t0_result = holidayChecker._isVeteransDay(t0);
    expect(t0_result).toBeTruthy();
    const t1 = new Date('11/11/2026');
    const t1_result = holidayChecker._isVeteransDay(t1);
    expect(t1_result).toBeTruthy();
  });

  it('should accurately identify Thanksgiving Day', () => {
    const t0 = new Date('11/27/2025');
    const t0_result = holidayChecker._isThanksgivingDay(t0);
    expect(t0_result).toBeTruthy();
    const t1 = new Date('11/26/2026');
    const t1_result = holidayChecker._isThanksgivingDay(t1);
    expect(t1_result).toBeTruthy();
  });

  it('should accurately identify Christmas Day', () => {
    const t0 = new Date('12/25/2025');
    const t0_result = holidayChecker._isChristmasDay(t0);
    expect(t0_result).toBeTruthy();
    const t1 = new Date('12/25/2026');
    const t1_result = holidayChecker._isChristmasDay(t1);
    expect(t1_result).toBeTruthy();
  });

  it('should accurately identify complex observation days', () => {
    const t0 = new Date('07/03/2026'); // July 4th will be observed on July 3rd in 2026
    const t0_result = holidayChecker.isHoliday(t0);
    expect(t0_result).toBeTruthy();
  });
});