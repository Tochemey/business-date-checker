import { BusinessDateChecker } from './business.date.checker';

describe('BusinessDateChecker', () => {
  describe('December 25 2018 in the US', () => {
    it('is not a business date', () => {
      const date: Date = new Date('December 25 2018');
      const country: string = 'US';
      const valid = BusinessDateChecker.isBusinessDate(date, country);
      expect(valid).toBeFalsy();
    });
  });

  describe('December 26 2018 in the US', () => {
    it('is not a business date', () => {
      const date: Date = new Date('December 26 2018');
      const country: string = 'US';
      const output = BusinessDateChecker.isBusinessDate(date, country);
      expect(output).toBeFalsy();
    });
  });

  describe('January 22 2019 in the US', () => {
    it('is not a business date', () => {
      const date: Date = new Date('January 22 2019');
      const country: string = 'US';
      const output = BusinessDateChecker.isBusinessDate(date, country);
      expect(output).toBeFalsy();
    });
  });

  describe('January 23 2019 in the US', () => {
    it('is a business date', () => {
      const date: Date = new Date('January 23 2019');
      const country: string = 'US';
      const output = BusinessDateChecker.isBusinessDate(date, country);
      expect(output).toBeTruthy();
    });
  });

  describe('July 14 2019 in France', () => {
    it('is a holiday', () => {
      const date: Date = new Date('July 14 2019');
      const country: string = 'FR';
      const output = BusinessDateChecker.isHoliday(date, country);
      expect(output).toBeTruthy();
    });
  });

  describe('Holiday - January 22 2019 in the US', () => {
    it('is a holiday', () => {
      const date: Date = new Date('January 22 2019');
      const country: string = 'US';
      const output = BusinessDateChecker.isHoliday(date, country);
      expect(output).toBeTruthy();
    });
  });

  describe('June 2 2019', () => {
    it('is a weekend day', () => {
      const date: Date = new Date('June 2 2019');
      const output = BusinessDateChecker.isWeekendDay(date);
      expect(output).toBeTruthy();
    });
  });

  describe('June 1 2019', () => {
    it('is a weekend day', () => {
      const date: Date = new Date('June 1 2019');
      const output = BusinessDateChecker.isWeekendDay(date);
      expect(output).toBeTruthy();
    });
  });

  describe('June 5 2019', () => {
    it('is a week day', () => {
      const date: Date = new Date('June 5 2019');
      const output = BusinessDateChecker.isWeekDay(date);
      expect(output).toBeTruthy();
    });
  });

  describe('Add 20 business days to December 25 2018', () => {
    it.skip('should return a valid business date of Friday, January 25th 2019', () => {
      const date: Date = new Date('December 25 2018');
      const delay: number = 20;
      const country: string = 'US';
      const result = BusinessDateChecker.addBusinessDays(date, delay, country);
      expect(result).toEqual('Friday, January 25th 2019');
    });
  });

  describe('Total Holidays between December 25th 2018 and January 25th 2019 in the US', () => {
    it.skip('should be 3', () => {
      const date1: Date = new Date('December 25 2018');
      const date2: Date = new Date('January 25 2019');
      const country: string = 'US';
      const result = BusinessDateChecker.holidaysBetween(date1, date2, country);
      expect(result).toEqual(3);
    });
  });

  describe('Total Weekend days between December 25th 2018 and January 25th 2019 in the US', () => {
    it('should be 8', () => {
      const date1: Date = new Date('December 25 2018');
      const date2: Date = new Date('January 25 2019');
      const result = BusinessDateChecker.weekendDaysBetween(date1, date2);
      expect(result).toEqual(8);
    });
  });

  describe('Holiday with invalid country code', () => {
    it('should return false', () => {
      const date: Date = new Date('January 22 2019');
      const country: string = 'USAT';
      const output = BusinessDateChecker.isHoliday(date, country);
      expect(output).toBeFalsy();
    });
  });

  describe('Total Week days between June 1 2019 and June 7th 2019 in the US', () => {
    it('should be 4', () => {
      const date1: Date = new Date('June 1 2019');
      const date2: Date = new Date('June 7 2019');
      const result = BusinessDateChecker.weekDaysBetween(date1, date2);
      expect(result).toEqual(4);
    });
  });

  describe('Business Date Checking with invalid country', () => {
    it('should be false', () => {
      const date: Date = new Date('January 23 2019');
      const country: string = 'USAT';
      const output = BusinessDateChecker.isBusinessDate(date, country);
      expect(output).toBeFalsy();
    });
  });

  describe('Holidays between January 25th 2019 and December 25th 2018 in the US', () => {
    it('should return -1', () => {
      const date1: Date = new Date('December 25 2018');
      const date2: Date = new Date('January 25 2019');
      const country: string = 'US';
      const result = BusinessDateChecker.holidaysBetween(date2, date1, country);
      expect(result).toEqual(-1);
    });
  });

  describe('Add negative business days to December 25 2018', () => {
    it('should be undefined', () => {
      const date: Date = new Date('December 25 2018');
      const delay: number = -1;
      const country: string = 'US';
      const result = BusinessDateChecker.addBusinessDays(date, delay, country);
      expect(result).toBeUndefined();
    });
  });

  describe('July 14 2019 in Benin', () => {
    it('is not a holiday', () => {
      const date: Date = new Date('July 14 2019');
      const country: string = 'BJ';
      const output = BusinessDateChecker.isHoliday(date, country);
      expect(output).toBeFalsy();
    });
  });
});
