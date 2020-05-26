const { testUtil } = require('../../modules/example/utils');

describe('Example Utils Suite', () => {

	describe('testUtils', () => {

		it('should return the value passed is truthful', () => {
			expect(testUtil(true)).toBe(true);
			expect(testUtil('test')).toBe('test');
			expect(testUtil([])).toEqual([]);
			expect(testUtil({ boo: true })).toEqual({ boo: true });
		});

		it('should return undefined as string if value passed is NOT truthful', () => {
			expect(testUtil()).toBe('undefined');
			expect(testUtil(false)).toBe('undefined');
			expect(testUtil(null)).toBe('undefined');
			expect(testUtil(0)).toBe('undefined');
		});
	});
});
