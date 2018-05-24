/**
 * Base webpack config used across other specific configs
 */

const path = require('path');
const webpack = require('webpack');

const paths = require('./paths');

module.exports = {

  context: __dirname,

  entry: {
    wallet: paths.appIndexJs,
  },

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
    extensions: ['.js', '.jsx', '.json', '.less'],
    modules: ['libs', 'node_modules'],
    alias: {
      '@': paths.appSrc,
    }
  },


};
