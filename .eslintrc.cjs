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
	ignorePatterns: ["src/graphql/*.generated.ts"],
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
		"@typescript-eslint/naming-convention": "off",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-unsafe-member-access": "off",
		"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
		"@typescript-eslint/restrict-template-expressions": "off",
		"eslint-comments/disable-enable-pair": "off",
		"eslint-comments/no-unlimited-disable": "off",
		"import/no-named-as-default": "off",
		"import/no-unresolved": "off",
		"import/order": ["error", {
			alphabetize: {
				order: "asc",
				caseInsensitive: false,
			},
			groups: ["builtin", "external", "internal", "parent", "sibling", "index", "type", "object"]
		}],
		"prettier/prettier": "off",
		"react-hooks/exhaustive-deps": "off",
		"no-console": "off",
	},
};
