const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const packageData = require('./package.json');

module.exports = [
	{
		mode: 'production',
		name: 'extend',
		entry: './src/index.js',
		target: 'web',
		output: {
			library: 'extend',
			libraryTarget: 'var',
			filename: 'extend.js',
			path: path.resolve(__dirname, './dist')
		},
		plugins: [
			new webpack.BannerPlugin({
				banner: `extend v${packageData.version}\nhttps://github.com/alexspirgel/extend`
			})
		],
		optimization: {
			minimize: false
		},
		watch: true
	},
	{
		mode: 'production',
		name: 'extend',
		entry: './src/index.js',
		target: 'web',
		output: {
			library: 'extend',
			libraryTarget: 'var',
			filename: 'extend.min.js',
			path: path.resolve(__dirname, './dist')
		},
		plugins: [
			new webpack.BannerPlugin({
				banner: `extend v${packageData.version}\nhttps://github.com/alexspirgel/extend`
			})
		],
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					extractComments: false,
					terserOptions: {
						keep_classnames: true
					}
				})
			]
		},
		watch: true
	}
];