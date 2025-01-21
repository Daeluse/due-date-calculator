import { DateInfo } from '../../src/utilities/date-info';

describe('DateInfoUtility', () => {
  let dateInfo: DateInfo;

  beforeEach(() => {
    dateInfo = new DateInfo();
  });

  it('should give the correct information about a calendar month', () => {
    const t0 = new Date('01/21/2025');
    const t0_result = dateInfo.getDateInfo(t0);
    const t0_assert_firstWeekday = 3;
    const t0_assert_lastDateOfMonth = 31;
    const t0_assert_lastDayOfMonth = 5;
    const t0_assert_weeksInMonth = 5;
    const t0_assert_currentWeek = 4

    expect(t0_result.firstWeekday).toEqual(t0_assert_firstWeekday);
    expect(t0_result.lastDateOfMonth).toEqual(t0_assert_lastDateOfMonth);
    expect(t0_result.lastDayOfMonth).toEqual(t0_assert_lastDayOfMonth);
    expect(t0_result.weeksInMonth).toEqual(t0_assert_weeksInMonth);
    expect(t0_result.currentWeek).toEqual(t0_assert_currentWeek);
  });
});