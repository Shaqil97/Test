const App = require('server-common/http/App');
const app = new App({ name: 'Example service' });
app.run([
	'example'
]);
