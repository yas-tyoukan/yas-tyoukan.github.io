module.exports = {
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.babel.js',
      }
    },
    react: {
      pragma: 'React',
      version: '16.6'
    },
  },
};
