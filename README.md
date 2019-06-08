# Business Date Library

 <p><a href="http://nodejs.org" target="_blank">Node.js</a> Typescript library for business date manipulation and validation for <strong>backend applications</strong>.</p>

[![Build Status](https://travis-ci.org/Tochemey/business-date-checker.svg?branch=master)](https://travis-ci.org/Tochemey/business-date-checker)

This libary helps validate business days, weekend days, week days and holidays for various countries in the world. So far 144 countries are supported([Worldwide holidays library](https://github.com/commenthol/date-holidays)).

The validation and parsing of date are done without timezone and dates without times.

# Usage

```bash
npm i business-date-checker
```

# Features

- Checking whether a date is a business date in a given country. _Business date is a date that is not a holiday nor a weekend day_
- Calculation of the number of week days between two dates. _Week days Monday to Friday_
- Calculation of the number of weekend days between two dates. _Weekend days Saturday and Sunday_
- Calculation of the number of holidays between two dates in a given country
- Checking whether a given date is a week day.
- Checking whether a given date in a country is a holiday
- Checking whether a given date is a weekend day.
- Addition of a number of business days to a given date in a country to get the next business date.

# APIs

- _**isBusinessDate(date: Date, countryCode: string): boolean**_ : Check whether a given Javascript date is a business date for a given country. A business date is a working day. It means any day of the year that is not a holiday or a weekend day. It returns true when the date is a valid business date or false when it is not a valid business date. The _**countryCode**_ is the ISO2 value of the country.

- _**weekDaysBetween(start: Date, end: Date): number**_: Calculates the number of week days between two Javascript dates. If end comes before start, then this function will return a negative value. Week days are Monday through Friday.

- _**weekendDaysBetween(start: Date, end: Date): number**_: Calculates the number of weekend days between two Javascript dates. If end comes before start, then this function will return a negative value. Weekend days are Saturday and Sunday.

- _**holidaysBetween(start: Date, end: Date, countryCode: string): number**_ : Calculates the number of holidays between two Javascript dates. If end comes before start, or country is not valid then this function will return -1. The _**countryCode**_ is the ISO2 value of the country.

- _**isWeekDay(date: Date): boolean**_: Checks whether a given Javascript date is a week day. Week days are Monday through Friday. This include days that are holidays.

- _**isWeekendDay(date: Date): boolean**_: Checks whether a given Javascript date is a weekend day. Weekend days are Saturday and Sunday.

- _**isHoliday(date: Date, countryCode: string): boolean**_: Checks whether a given Javascript date is a holiday in a given country. The _**countryCode**_ is the ISO2 value of the country.

- _**addBusinessDays(date: Date, amount: number, countryCode: string): any**_ : Add business days to a javascript date in a given country. The actual date is return in the format _dddd, MMMM Do YYYY_. It skips weekend days and holidays in that country. If the country is invalid or the amount is less than 1 it will return undefined.

# References

- [Worldwide holidays library](https://github.com/commenthol/date-holidays)
- [Utilities for week days in Moment](https://github.com/jamesplease/moment-business)
