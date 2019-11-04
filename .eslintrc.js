/* eslint-disable */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  globals: {
    __webpack_public_path__: true,
    __dirname: true,
    console: true,
    location: true,
    Vue: true,
    React: true,
    RAP: true,
    session: true,
    wx: true,
    process: true,
  },
  rules: {
    'object-curly-spacing': [
      2, 'always'
    ],
    'arrow-body-style': [0],
    'object-property-newline': [0],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-shadow': ['error', { allow: ['state'] }],
    'import/resolver': 'webpack',
    'import/no-unresolved': 0,
    'linebreak-style': ['off', 'windows'],
    'semi': ['error', 'never'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'max-len': ['error', { code: 300 }],
    'no-underscore-dangle': [0],
    'func-names': [0],
    'prefer-arrow-callback': [0],
    'no-plusplus': 'off',
    'no-bitwise': 'off',
    'no-shadow': ['error', { 'allow': ['state'] }],
    'no-else-return': [0],
    'curly': [
      'warn'
    ],
    'camelcase': [
      1
    ],
    'comma-dangle': [
      0
    ],
    'consistent-return': [
      0
    ],
    'eol-last': [
      0
    ],
    'func-names': [
      0
    ],
    'guard-for-in': [
      0
    ],
    'quote-props': [
      0
    ],
    'format': [
      0
    ],
    'import/extensions': [
      0
    ],
    'import/no-extraneous-dependencies': [
      0
    ],
    'import/no-unresolved': [
      0
    ],
    'import/no-dynamic-require': [
      0
    ],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
        'VariableDeclarator': {
          'var': 1,
          'let': 1,
          'const': 1
        },
        'MemberExpression': 2
      }
    ],
    'linebreak-style': [
      0
    ],
    'max-len': [
      'error',
      {
        'code': 256
      }
    ],
    'no-alert': [
      0,
      'always'
    ],
    'no-console': [
      0
    ],
    'no-extend-native': [
      0
    ],
    'no-restricted-globals': [
      0
    ],
    'no-lonely-if': [
      0
    ],
    'no-mixed-operators': [
      0
    ],
    'no-multi-assign': [
      0
    ],
    'no-new': [
      0
    ],
    'no-new-symbol': [
      'off'
    ],
    'no-new-func': [
      0
    ],
    'no-new-object': [
      'off'
    ],
    'no-new-wrappers': [
      'off'
    ],
    'no-new-require': [
      'off'
    ],
    'no-param-reassign': [
      0
    ],
    'global-require': [
      0
    ],
    'one-var': [
      0
    ],
    'one-var-declaration-per-line': [
      0
    ],
    'prefer-const': [
      0
    ],
    'no-debugger': 2,
    'no-restricted-syntax': [
      0
    ],
    'no-underscore-dangle': [
      0
    ],
    'no-unused-expressions': [
      0
    ],
    'no-unused-vars': [
      'warn',
      {
        'vars': 'local',
        'args': 'none',
        'ignoreRestSiblings': true
      }
    ],
    'no-useless-escape': [
      0
    ],
    'operator-assignment': [
      0
    ],
    'prefer-destructuring': [
      0
    ],
    'prefer-rest-params': [
      0
    ],
    'space-before-function-paren': [
      0
    ],
    'arrow-parens': [
      0
    ],
    'require-yield': 0,
    'function-paren-newline': [
      0
    ],
    'semi': [
      'error',
      'never'
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        'block': {
          'markers': [
            '*'
          ],
          'exceptions': [
            '**'
          ],
          'balanced': true
        }
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
