module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true
  },
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    complexity: ['error', 10],
    'prefer-object-spread': 'error',
    'no-dupe-class-members': 'off',
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_'
      }
    ]
  }
}
