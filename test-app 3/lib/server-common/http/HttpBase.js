const validate = require('express-validation');
const Joi = require('joi');
const httpUtils = require('./utils');

/**
 * Class to simplify the creation of node application by providing common helpers to facilitate the handling of routes
 * and common responses. Should be use to extend your own custom class.
 * @class
 */
class HttpBase {

	/**
	 * Initialise the class and set express and path to use throughout
	 * @param app {App} Instance of Application
	 * @param [path] {string} Path prefix for routes inside
	 */
	constructor(app, path) {
		this.express = app.express;
		this.path = path;
		this.app = app;
	}

	/**
	 * Add routes for the current module instance.
	 * Each route is an array containing, in order: route address, function to execute and an optional middleware.
	 * @param routes {Array} Multidimensional array containing route configuration
	 *
	 * @example
	 *
	 * const someMethod = (req, res, next) => {};
	 *
	 * this.routes([
	 * ['/some/path', someMethod, optionalMiddleWare]
	 * ]);
	 */
	routes(routes) {
		httpUtils.addRoutes(this, routes);
	}

	/**
	 * Helper than implement express-validation
	 * @param makeConfig {function} Function that return an express-validation schema
	 */
	validation(makeConfig) {
		return validate(makeConfig(Joi));
	}
}

module.exports = HttpBase;
