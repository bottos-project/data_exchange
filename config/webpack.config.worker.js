/**
 * Base webpack config used across other specific configs
 */

const path = require('path');
const webpack = require('webpack');

const paths = require('./paths');

const pkg = require('../package.json');

module.exports = {

  context: __dirname,

  target: 'webworker',

  entry: {
    worker: paths.appWorkerJs,
  },

  output: {

    path: paths.appPublic,

    filename: 'worker.js',

  },

  mode: pkg.DEV ? "development" : 'production',

  module: {

    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    }]

  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules'],
  },


};
