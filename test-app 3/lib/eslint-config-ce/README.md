# Climate Edge ESLint Configuration

ESLint configuration to use with all JS based Climate Edge projects.

Original version ported from the angular client TLint configuration.

## Usage

Add it to your `package.json` file like so:

```
"eslint-config-cs": "git+https://ceRead:Db9DwnzWJvNkPtX9@bitbucket.org/climateedge/eslint-config-ce.git#v0.1.15"
```

Then the only property needed in your `eslintrc.js` project file is:

```
"extends": "eslint-config-ce"
```

## Documentation

- run `node docs.js`
- visit http://localhost:3000/docs
- click on a rule link to see documentation
