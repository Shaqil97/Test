/**
 * Check if the value is a valid function that can be used as middleware, if it is not it will return a middleware
 * function that will simply run the next() method to let the process run
 * @param middleware {Function|any} Value to check for potential middleware function
 * @returns {*}
 */
const getMiddleware = (middleware) => {
	return (middleware && typeof middleware === 'function') ? middleware : (req, res, next) => {
		next()
	};
};

/**
 * Add multiple routes configuration to the express object of the instance provided.
 * Expect the instance to be an instance of BaseModule or other modules extending BaseModule
 * Each route iteration is an array containing: HTTP Method, Route Path, Route Handler and optional Middleware
 * @param instance {HttpBase} Instance of HttpBase
 * @param routes {Object[]} Route configuration
 *
 * @example
 * addRoute([
 *     ['get', '/list', (req, res, next) => { console.log('list endpoint hit!');}],
 *     ['post', '/create', (req, res, next) => { console.log('list endpoint hit!'); }, (req, res, next) => {}] // with optional middleware
 * ]);
 */
const addRoutes = (instance, routes) => {
	routes.map((route) => {
		const url = instance.path ? `/${instance.path}/${route[1]}` : `/${route[1]}`;
		instance.express[route[0]](url, getMiddleware(route[3]), (req, res, next) => {
			route[2].call(instance, req, res, next);
		});
	});
};

/**
 * Returns a method that can be used as HTTP server error handler
 * @param port {number} The port number the server is attempting to listen to
 * @returns {Function}
 */
const serverErrorHandler = (port) => {
	return (error) => {
		if (error.syscall !== 'listen') {
			throw error;
		}

		const bind = typeof port === 'string'
			? 'Pipe ' + port
			: 'Port ' + port;

		switch (error.code) {
			case 'EACCES':
				console.error(`${bind} requires elevated privileges`);
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(`${bind} is already in use`);
				process.exit(1);
				break;
			default:
				throw error;
		}
	}
};

/**
 * Return a function to be used as server listening handler. It is run when the HTTP server started to listen
 * successful to the port requested.
 * @param port {number} The port number
 * @returns {Function}
 */
const serverListenHandler = (port) => {
	return () => {
		console.log(`Listening on port ${port}`);
	}
};

module.exports = {
	serverErrorHandler,
	serverListenHandler,
	getMiddleware,
	addRoutes
};
