const utils = require('../../http/utils');
const { getMockHttpBase } = require('../helpers/mockHttpBase');

describe('HTTP Utils', () => {

	describe('getMiddleWare', () => {

		it('should return the function passed', () => {
			const method = () => {
				return true;
			};
			expect(utils.getMiddleware(method)).toBe(method);
			expect(utils.getMiddleware(method)()).toBe(true);
		});

		it('should return a default function that runs next argument if none provided', () => {

			let nextValue = false;
			const nextMethod = () => {
				nextValue = true;
			};
			const middleware = utils.getMiddleware(null);

			expect(nextValue).toBe(false);
			middleware(null, null, nextMethod);
			expect(nextValue).toBe(true);
		});
	});

	describe('addRoutes', () => {

		const routes = [['get', 'testGet', () => {}],
			['post', 'testPost', () => {}],
			['put', 'testPut', () => {}]];

		it('should add routes to express', () => {

			const instance = getMockHttpBase();

			utils.addRoutes(
				instance, routes
			);
			expect(instance.express.routes[0].method).toBe('get');
			expect(instance.express.routes[0].url).toBe('/testGet');
			expect(instance.express.routes[1].method).toBe('post');
			expect(instance.express.routes[1].url).toBe('/testPost');
			expect(instance.express.routes[2].method).toBe('put');
			expect(instance.express.routes[2].url).toBe('/testPut');
		});

		it('should add routes to express using instance path as url prefix', () => {

			const instance = getMockHttpBase('foo');

			utils.addRoutes(
				instance, routes
			);
			expect(instance.express.routes[0].method).toBe('get');
			expect(instance.express.routes[0].url).toBe('/foo/testGet');
			expect(instance.express.routes[1].method).toBe('post');
			expect(instance.express.routes[1].url).toBe('/foo/testPost');
			expect(instance.express.routes[2].method).toBe('put');
			expect(instance.express.routes[2].url).toBe('/foo/testPut');
		});

	});

	describe('serverListenHandler', () => {

		let originalConsoleLog;
		let consoleValue;

		beforeEach(() => {
			originalConsoleLog = console.log;
			console.log = (value) => {
				consoleValue = value;
			};
		});

		afterEach(() => {
			console.log = originalConsoleLog;
			originalConsoleLog = null;
		});

		it('should return a function that fires a console.log including the port when ran', () => {
			const port = 10;
			const handler = utils.serverListenHandler(port);

			expect(typeof utils.serverListenHandler(10)).toBe('function');
			handler();
			expect(consoleValue).toBe('Listening on port 10')

		});
	});
});
