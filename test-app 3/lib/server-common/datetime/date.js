/**
 * Compare to date together to see if they are the same day
 * Ignores time and only check day, month and year
 * @param d1 {Date|string} First date instance
 * @param d2 {Date|string} Second date instance
 * @returns {boolean}
 */
const isSameDay = (d1, d2) => {
	if (typeof d1 === 'string' && typeof d2 === 'string') {
		return d1.trim() === d2.trim();
	} else {
		return d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getDate() === d2.getDate();
	}
};

module.exports = {
	isSameDay
};
