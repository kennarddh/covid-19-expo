// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	globals: {
		process: 'readonly',
		__dirname: 'readonly',
	},
	extends: [
		'eslint:recommended',
		'universe/native',
		'plugin:import/recommended',
		'plugin:react-hooks/recommended',
		'plugin:security/recommended',
	],
	plugins: ['react', 'prettier', 'jsx-a11y'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	settings: {
		'import/extensions': ['.js', '.jsx'],
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx'],
				moduleDirectory: ['node_modules', 'src/'],
			},
			alias: {
				map: [['.', './src']],
				extensions: ['.js', '.jsx'],
			},
		},
		react: {
			version: 'detect',
		},
	},
	rules: {
		'prettier/prettier': [
			'warn',
			{
				endOfLine: 'lf',
			},
		],
		'import/prefer-default-export': 'off',
		'linebreak-style': ['error', 'unix'],
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'react/prop-types': 'off',
		'no-case-declarations': 'off',
		'react/jsx-curly-brace-presence': 'warn',
		'react/jsx-no-useless-fragment': 'warn',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
			},
		],
		'import/order': ['error', { 'newlines-between': 'ignore' }],
		'import/namespace': 'off',
	},
}
