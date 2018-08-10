const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));
const paths = require('./paths');

// 清空 build 文件夹
fs.emptyDirSync(paths.appBuild);

// 把 public 文件夹的静态文件拷过去
(function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
})()


const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';


const proConfig = webpackMerge(commonConfig, {

  devtool: shouldUseSourceMap ? 'source-map' : false,

  output: {

    path: paths.appBuild,

    filename: 'static/js/[name]-[hash:6].min.js',

  },

  module: {
    rules: [

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              // sourceMap: shouldUseSourceMap
            }
          },
        ]
      },

      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false, minimize: true }
          },
          {

            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: themeVariables
            }
          },
        ]
      },


    ]
  },

  mode: "production",

  plugins: [

    new UglifyJSPlugin({
      parallel: true,
      uglifyOptions: {
        ecma: 6,
        ie8: false,
        warnings: false,
        compress: {
          drop_console: true,
        },
      },
    }),

    // new ExtractTextPlugin('static/css/[name]-[hash:6].min.css'),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "static/css/[name]-[hash:6].min.css",
      // chunkFilename: "[id].css"
    }),

    new HtmlWebpackPlugin({
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    new webpack.DllReferencePlugin({
      context: paths.appNodeModules,
      manifest: require('./libs-manifest.json'),
    }),

  ],
});

module.exports = proConfig
