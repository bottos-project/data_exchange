const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));

const paths = require('./paths');

const devConfig = webpackMerge(commonConfig, {
  devtool: 'eval-source-map',

  output: {

    path: paths.appPublic,

    filename: 'static/js/bundle-[hash:4].js',

  },

  module: {
    rules: [

      {
          test: /\.css$/,
          use: [
              'style-loader',
              {
                  loader: 'css-loader',
                  options: {
                      sourceMap: true,
                  }
              },
          ]
      },

      {
          test: /\.less$/,
          use: [
              'style-loader',
              {
                  loader: 'css-loader',
                  options: {
                      sourceMap: true,
                  }
              },
              {
                  loader: 'less-loader',
                  options: {
                      javascriptEnabled: true,
                      sourceMap: true,
                      modifyVars: themeVariables
                      // includePaths: [dirSass]
                  }
              }
          ]
      },

    ]
  },

  mode: "development",

  plugins: [

    new webpack.LoaderOptionsPlugin({
      debug: true
    }),

    new webpack.NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      template: paths.appHtml,
    })

  ],

  devServer: {
    contentBase: paths.appPublic,
    compress: true,
    hot: true,
    port: 3000,
    proxy: {
      '/test': 'http://localhost:3000'
    }
  }

});
module.exports = devConfig
