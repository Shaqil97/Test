const packageJSON = require('./package.json');

module.exports = {
	info: {
		title: packageJSON.name,
		version: packageJSON.version,
		description: packageJSON.description,
	},
	basePath: '/',
	apis: ['modules/**/*.js']
};
