const HttpBase = require('server-common/http/HttpBase');
const { testUtil } = require('./utils');

/**
 * @class
 */
class Example extends HttpBase {

	/**
	 * @constructor
	 * @param app {App}
	 * @param [routePrefix] {string}
	 */
	constructor(app, routePrefix = 'example') {

		super(app, routePrefix);

		this.routes([
			['get', 'test', this.test]
		]);
	}

	/**
	 * Just a test command
	 * @param req {object}
	 * @param res {object}
	 * @param next {Function}
	 *
	 * @swagger
	 *  /test:
	 *    get:
	 *      description: Returns an object with a message
	 *      produces:
	 *        - application/json
	 *      response:
	 *        200:
	 *          description: This is an example :D
	 *
	 */
	test(req, res, next) {
		testUtil(true);
		res.status(200).json({
			message: 'This is an example :D'
		});
	}
}

module.exports = Example;
