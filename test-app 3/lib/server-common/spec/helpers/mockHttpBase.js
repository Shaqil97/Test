const mockExpress = {
	routes: [],
	addRoute: (method, url, middleWare, handler) => {
		mockExpress.routes.push({
			method,
			url,
			middleWare,
			handler
		});
	},
	get: (url, middleWare, handler) => {
		mockExpress.addRoute('get', url, middleWare, handler);
	},
	post: (url, middleWare, handler) => {
		mockExpress.addRoute('post', url, middleWare, handler);
	},
	put: (url, middleWare, handler) => {
		mockExpress.addRoute('put', url, middleWare, handler);
	},
};

const mockHttpBase = {
	path: '',
	express: mockExpress
};

const getMockHttpBase = (path) => {
	const value = Object.assign({}, mockHttpBase);
	value.express.routes = [];
	value.path = path;
	return value;
};

module.exports = {
	getMockHttpBase
};
