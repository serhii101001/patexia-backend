import { formatDateToNative } from '../syntheticDate/helper/formatDateToNative';
import { syntheticDate } from '../syntheticDate/syntheticDate';

describe('syntheticDate test', () => {
  it('return a synthectic date event', () => {
    const { setDate } = syntheticDate('date');

    const date = '11-02-2020';
    const format = 'DD-MM-YYYY';
    const event = setDate(date, format);

    expect(event.type).toBe('change');
  });
  it('format the date correctly for a native input date', () => {
    const date = '11-02-2020';
    const format = 'DD-MM-YYYY';

    const rightFormatDate = formatDateToNative(date, format);

    expect(rightFormatDate).toBe('2020-02-11');
  });
  it('fill in the year with zeros when it is less than four digits', () => {
    const date = '11-02-2';
    const format = 'DD-MM-YYYY';

    const rightFormatDate = formatDateToNative(date, format);

    expect(rightFormatDate).toBe('2000-02-11');
  });
});
