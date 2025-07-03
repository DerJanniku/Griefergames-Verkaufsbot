const globals = require('globals');
const tseslint = require('typescript-eslint');
const pluginPrettier = require('eslint-plugin-prettier');
const pluginImport = require('eslint-plugin-import');

module.exports = [
  {
    ignores: ['dist/', 'node_modules/', 'coverage/'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: pluginPrettier,
      import: pluginImport,
    },
    rules: {
      ...pluginPrettier.configs.recommended.rules,
      'prettier/prettier': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
];
