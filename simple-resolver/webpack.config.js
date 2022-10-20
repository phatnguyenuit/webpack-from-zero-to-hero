const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack configuration function
 * @param {any} env Webpack env
 * @param {any} argv Webpack argv
 * @returns {webpack.Configuration}
 */
function configurationFunc(env, agrv) {
  console.log('[INFO] env', env);
  console.log('[INFO] agrv', agrv);

  /** @type {webpack.Configuration['mode']} */
  const mode = env.production ? 'production' : 'development';
  const outputFileName = env.production
    ? '[name].[contenthash:8].js'
    : '[name].bundle.js';

  return {
    mode,
    target: 'web',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist', mode),
      filename: outputFileName,
      // Clean the output directory before emit.
      clean: true,
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        inject: 'body',
        scriptLoading: 'blocking',
      }),
    ],
    resolve: {
      alias: {
        'vendor-a': path.resolve(__dirname, 'src/vendors/vendor-a.js'),
      },
      // modules: [path.resolve(__dirname, 'src'), 'node_module'],
    },
  };
}

module.exports = configurationFunc;
