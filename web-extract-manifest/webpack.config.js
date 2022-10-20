const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

/** @type {import("webpack").Configuration} */
module.exports = {
  mode: 'production',
  target: 'web',
  // Default entry = src/index.js
  entry: [path.resolve(__dirname, 'src/index.js'), './src/print.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:8].js',
    clean: true,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
    }),
  ],
};
