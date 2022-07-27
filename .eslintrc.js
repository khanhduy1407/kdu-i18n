'use strict'

module.exports = {
  root: true,
  globals: {
    __DEV__: true,
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true
  },
  env: {
    node: true,
    jest: true
  },
  extends: [
    'plugin:kdu-libs/recommended',
    'plugin:kdu/kdu3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint'],
  parser: 'kdu-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    'object-curly-spacing': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'kdu/one-component-per-file': 'off',
    'kdu/experimental-script-setup-vars': 'off',
    'kdu/no-deprecated-props-default-this': 'off'
  }
}
