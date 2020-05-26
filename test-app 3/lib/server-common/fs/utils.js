const fs = require('graceful-fs');

/**
 * Create a directory if it doesn't exists
 * @param directory {String} Path to directory
 *
 * @example
 * createDirIfNeeded('./dirname');
 */
const createDirIfNeeded = (directory) => {
	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory);
	}
};

module.exports = {
	createDirIfNeeded
};
