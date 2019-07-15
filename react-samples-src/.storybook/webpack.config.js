require('@babel/register');
const config = require('../webpack.config.babel.js');

module.exports = config.default(process.env, { mode: process.env.NODE_ENV });
