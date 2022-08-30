module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:import/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:hydrogen/recommended",
		"plugin:hydrogen/typescript",
	],
	plugins: ["@typescript-eslint"],
	parser: "@typescript-eslint/parser",
	overrides: [
		{
			files: "**/*.ts",
			extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
			parserOptions: {
				tsConfigRootDir: __dirname,
				project: ["./tsconfig.json"],
			},
		},
	],
	ignorePatterns: ["src/graphql/generated.ts"],
	settings: {
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
			},
			node: true,
		},
	},
	rules: {
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/ban-types": "off",
		"import/no-named-as-default": "off",
		"import/no-unresolved": "off",
		"prettier/prettier": "off",
		"react-hooks/exhaustive-deps": "off",
	},
};
