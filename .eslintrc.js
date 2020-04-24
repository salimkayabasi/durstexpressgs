module.exports = {
  'extends': [
    'airbnb-base',
    'plugin:prettier/recommended'
  ],
  'plugins': [
    'googleappsscript'
  ],
  'env': {
    'googleappsscript/googleappsscript': true,
    'node': true,
    'jest': true,
  },
  'rules': {
    'prettier/prettier': [
      'error',
      {
        'arrowParens': 'always',
        'singleQuote': true,
        'trailingComma': 'all'
      }
    ]
  }
};
