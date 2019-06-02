import * as moment from 'moment';
import * as business from 'moment-business';
import * as countries from 'i18n-iso-countries';
// tslint:disable-next-line: no-var-requires
const Holidays = require('date-holidays');

export class BusinessDateChecker {
  /**
   * @description Checks whether a javascript date is a business date for a given country or not.
   * A business date is a working day. It means any day of the year that is not a holiday or a weekend day.
   * It returns true when the date is a valid business date or false on the contrary
   * @author Arsene Tochemey Gandote<tochemey26@gmail.com>
   * @date 2019-06-01
   * @static
   * @param {Date} date Javascript date
   * @param {string} countryCode ISO2 Country code
   * @returns {boolean} true or false
   * @memberof BusinessDateChecker
   */
  public static isBusinessDate(date: Date, countryCode: string): boolean {
    const DATE_FORMAT = 'YYYY-MM-DD';
    const dateTostring =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    const actualDate = moment.utc(dateTostring, DATE_FORMAT);
    const iso2Code: string = countryCode.toUpperCase();

    if (!countries.isValid(iso2Code)) {
      return false;
    }

    const holidays = new Holidays(iso2Code);
    return !(
      business.isWeekendDay(actualDate) ||
      holidays.isHoliday(actualDate.toDate())
    );
  }

  /**
   * @description Calculate the number of week days between two javascript dates.
   * If end comes before start, then this function will return a negative value.
   * Week days are Monday through Friday.
   * @author Arsene Tochemey Gandote<tochemey26@gmail.com>
   * @date 2019-06-01
   * @param {Date} start Start date
   * @param {Date} end End Date
   * @returns {number} The number of week days
   * @memberof BusinessDateChecker
   */
  public static weekDaysBetween(start: Date, end: Date): number {
    const DATE_FORMAT = 'YYYY-MM-DD';
    const startToString =
      start.getFullYear() +
      '-' +
      (start.getMonth() + 1) +
      '-' +
      start.getDate();

    const endToString =
      end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();

    const startDate: moment.Moment = moment.utc(startToString, DATE_FORMAT);
    const endDate: moment.Moment = moment.utc(endToString, DATE_FORMAT);

    return business.weekDays(startDate, endDate);
  }

  /**
   * @description Calculate the number of weekend days between two javascript dates.
   * If end comes before start, then this function will return a negative value.
   * Weekend days are Saturday and Sunday.
   * @author Arsene Tochemey Gandote<tochemey26@gmail.com>
   * @date 2019-06-01
   * @static
   * @param {Date} start Start date
   * @param {Date} end End Date
   * @returns {number} The number of weekend days
   * @memberof BusinessDateChecker
   */
  public static weekendDaysBetween(start: Date, end: Date): number {
    const DATE_FORMAT = 'YYYY-MM-DD';
    const startToString =
      start.getFullYear() +
      '-' +
      (start.getMonth() + 1) +
      '-' +
      start.getDate();

    const endToString =
      end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();

    const startDate: moment.Moment = moment.utc(startToString, DATE_FORMAT);
    const endDate: moment.Moment = moment.utc(endToString, DATE_FORMAT);
    return business.weekendDays(startDate, endDate);
  }

  /**
   * @description Calculate the number of holidays days between two javascript dates for a given country.
   * If end comes before start, or country is not valid then this function will return -1.
   * @author Arsene Tochemey Gandote<tochemey26@gmail.com>
   * @date 2019-06-01
   * @static
   * @param {Date} start Start date
   * @param {Date} end End date
   * @param {string} countryCode  ISO2 Country code
   * @returns {number} The number of holidays
   * @memberof BusinessDateChecker
   */
  public static holidaysBetween(
    start: Date,
    end: Date,
    countryCode: string,
  ): number {
    const DATE_FORMAT = 'YYYY-MM-DD';
    const startToString =
      start.getFullYear() +
      '-' +
      (start.getMonth() + 1) +
      '-' +
      start.getDate();

    const endToString =
      end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();

    const startDate: moment.Moment = moment.utc(startToString, DATE_FORMAT);
    const endDate: moment.Moment = moment.utc(endToString, DATE_FORMAT);

    const iso2Code: string = countryCode.toUpperCase();

    if (!countries.isValid(iso2Code) || !startDate.isBefore(endDate)) {
      return -1;
    }

    const holidays = new Holidays(iso2Code);
    const totalDaysElapsed: number = endDate.diff(startDate, 'd') + 1;
    let totalHolidays = 0;
    for (let index = 1; index < totalDaysElapsed; index++) {
      const dateToBeTested = moment
        .utc(startToString, DATE_FORMAT)
        .add(index, 'd');
      if (holidays.isHoliday(dateToBeTested.toDate())) {
        totalHolidays += 1;
      }
    }
    return totalHolidays;
  }

  /**
   * @description Checks whether a javascript date is a week day or not.
   * Week days are Monday through Friday.
   * @author Arsene Tochemey Gandote<tochemey26@gmail.com>
   * @date 2019-06-01
   * @static
   * @param {Date} date Javascript date
   * @returns {boolean} true or false
   * @memberof BusinessDateChecker
   */
  public static isWeekDay(date: Date): boolean {
    const DATE_FORMAT = 'YYYY-MM-DD';
    const dateTostring =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    const actualDate = moment.utc(dateTostring, DATE_FORMAT);
    return business.isWeekDay(actualDate);
  }

  /**
   * @description Checks whether a javascript date is a weekend day or not.
   * Weekend days are Sunday or Saturday.
   * @author Arsene Tochemey Gandote<tochemey26@gmail.com>
   * @date 2019-06-01
   * @static
   * @param {Date} date Javascript date
   * @returns {boolean} true or false
   * @memberof BusinessDateChecker
   */
  public static isWeekendDay(date: Date): boolean {
    const DATE_FORMAT = 'YYYY-MM-DD';
    const dateTostring =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    const actualDate = moment.utc(dateTostring, DATE_FORMAT);
    return business.isWeekendDay(actualDate);
  }

  /**
   * @description Checks whether a javascript date in a country is a holiday or not.
   * If the country is not valid then false is returned.
   * @author Arsene Tochemey Gandote<tochemey26@gmail.com>
   * @date 2019-06-02
   * @static
   * @param {Date} date Javascript date
   * @param {string} countryCode Iso2 country code
   * @returns {boolean} true or false
   * @memberof BusinessDateChecker
   */
  public static isHoliday(date: Date, countryCode: string): boolean {
    const iso2Code: string = countryCode.toUpperCase();
    const DATE_FORMAT = 'YYYY-MM-DD';
    const dateTostring =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    const actualDate = moment.utc(dateTostring, DATE_FORMAT);
    if (!countries.isValid(iso2Code)) {
      return false;
    }

    const holidays = new Holidays(iso2Code);
    return holidays.isHoliday(actualDate.toDate()) ? true : false;
  }

  /**
   * @description Add business days to a javascript date in a given country. The actual date is return in the format dddd, MMMM Do YYYY.
   * It skips weekend days and holidays in that country. If the country is invalid or the amount is
   * less than 1 it will return undefined.
   * @author Arsene Tochemey Gandote<tochemey26@gmail.com>
   * @date 2019-06-01
   * @static
   * @param {Date} date Javascript date
   * @param {number} amount Amount of week days to add
   * @param {string} countryCode ISO2 Country code
   * @returns {*} udefined or a date in the format dddd, MMMM Do YYYY
   * @memberof BusinessDateChecker
   */
  public static addBusinessDays(
    date: Date,
    amount: number,
    countryCode: string,
  ): any {
    const DATE_FORMAT = 'YYYY-MM-DD';
    const dateTostring =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    let actualDate = moment.utc(dateTostring, DATE_FORMAT);
    const iso2Code: string = countryCode.toUpperCase();

    if (!countries.isValid(iso2Code) || amount < 1) {
      return undefined;
    }

    const holidays = new Holidays(iso2Code);
    let addedDays: number = 0;
    while (addedDays < amount) {
      actualDate = actualDate.add(1, 'd');
      if (
        !(
          business.isWeekendDay(actualDate) ||
          holidays.isHoliday(actualDate.toDate())
        )
      ) {
        addedDays += 1;
      }
    }

    return actualDate.format('dddd, MMMM Do YYYY');
  }
}
