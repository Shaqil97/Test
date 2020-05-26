const bodyParser = require('body-parser');
const express = require('express');
const { serverErrorHandler, serverListenHandler } = require('./utils');

/**
 * Base application class that setup a basic express application and provide methods to simplify and normalise the
 * creation of applications and services.
 * @class
 *
 * @example
 * const App = require('server-common/http/App');
 * const app = new App(process.env.PORT || 3456);
 * const modules = [
 * 	'module1',
 * 	'module2'
 * ];
 *
 * app.run(modules);
 */
class App {

	/**
	 * Initialize a new instance with provided options
	 * @param options {object} Can contain optional port and timeout options
	 */
	constructor(options) {
		this.name = options.name || 'Unknown app';
		this.port = options.port || process.env.PORT || 3000;
		this.timeout = options.timeout || this.timeout;
		this.init();
	}

	/**
	 * Initialise an express instance
	 */
	init() {
		this.express = express();
		this.express.set('port', this.port);
		this.express.use(bodyParser.json());
		this.express.get('/', (req, res) => {
			res.status(200).json({
				message: `${this.name} running!`
			});
		});
	}

	/**
	 * Initialise the application modules
	 */
	initModules() {
		this.modules.map((mod) => {
			const Module = require(`${process.cwd()}/modules/${mod}`);
			new Module(this);
		});
	}

	/**
	 * Initialise the server and start listening
	 */
	initServer() {
		this.server = this.express.listen(this.port);
		if (this.timeout) {
			this.server.setTimeout(this.timeout);
		}
		this.server.on('error', serverErrorHandler(this.port));
		this.server.on('listening', serverListenHandler(this.port));
	}

	/**
	 * Public methods to start the application up with the provide modules
	 * @param modules {string[]} Array of modules name to load
	 */
	run(modules) {
		this.modules = modules;
		this.initModules();
		this.initServer();
	}
}

module.exports = App;
