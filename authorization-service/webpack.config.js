const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './handler.js',
  target: 'node',
  plugins: [
    new webpack.IgnorePlugin({resourceRegExp: /^pg-native$/ })
  ],
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '.webpack'),
    filename: 'handler.js',
  },
};