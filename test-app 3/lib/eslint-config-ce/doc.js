const getRuleURI = require('eslint-rule-documentation');
const App = require('server-common/http/App');
const { rules } = require('./index');
const app = new App({ name: 'ESLint documentation' });

app.express.get('/docs', (req, res) => {

	const content = ['<style>body { font-family: arial; font-size 12px; } table, th, td { border: 1px solid #ccc; }</style>'];
	content.push('<table>');
	content.push('<tr><th>Rule</th><th>Option</th></tr>');

	for (const ruleId in rules) {
		const { url } = getRuleURI(ruleId);
		const option = typeof rules[ruleId] === 'string' ? rules[ruleId] : JSON.stringify(rules[ruleId]);
		content.push(`<tr><td style="white-space: nowrap"><a href="${url}">${ruleId}</a></td><td>${option}</td></tr>`);
	}

	content.push('</table>');

	res.status(200).send(content.join(''));
});

app.run([]);
