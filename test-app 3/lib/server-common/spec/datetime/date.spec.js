const { isSameDay } = require('../../datetime/date');

describe('Datetime Date Suite', () => {

	describe('isSameDay', () => {

		it('should return false if dates do not match', () => {
			const date1 = new Date();
			const date2 = new Date('2000-01-01');
			const string1 = '2020-01-01';
			const string2 = '2000-01-01';

			// test with date object
			expect(isSameDay(date1, date2)).toBe(false);

			// test with date as string
			expect(isSameDay(string1, string2)).toBe(false);
		});

		it('should return true if dates do match', () => {
			const date = new Date();
			const string = '2020-01-01';

			// test with date object
			expect(isSameDay(date, date)).toBe(true);

			// test with date as string
			expect(isSameDay(string, string)).toBe(true);
		});
	});
});
