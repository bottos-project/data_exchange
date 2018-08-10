
const path = require("path");
const webpack = require("webpack");
const { appNodeModules, appPublic }= require('./paths');

console.log('__dirname', __dirname);

const libs = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
];

module.exports = {
	mode: "production",

	resolve: {
		extensions: [".js", ".jsx"]
	},

	entry: { libs },

	output: {
		path: appPublic,
		filename: "[name]_[hash:6].js",
		library: "[name]_[hash]"
	},

	plugins: [
		new webpack.DllPlugin({
			context: appNodeModules,
			path: path.join(__dirname, "[name]-manifest.json"),
			name: "[name]_[hash]"
		})
	]

};
