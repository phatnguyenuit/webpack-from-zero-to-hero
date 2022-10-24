const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

/**
 * Webpack configuration function
 * @param {any} env Webpack env
 * @param {any} argv Webpack argv
 * @returns {webpack.Configuration}
 */
function configurationFunc(env, agrv) {
  console.log('[INFO] env', env);
  console.log('[INFO] agrv', agrv);

  const isProdEnv = Boolean(env.production);
  /** @type {webpack.Configuration['mode']} */
  const mode = isProdEnv ? 'production' : 'development';
  const outputFileName = isProdEnv
    ? '[name].[contenthash:8].js'
    : '[name].bundle.js';

  return {
    mode,
    target: 'node',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      path: path.resolve(__dirname, 'dist', mode),
      filename: outputFileName,
      // Clean the output directory before emit.
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new ForkTsCheckerWebpackPlugin({
        async: !isProdEnv,
      }),
    ],
    devtool: isProdEnv ? false : 'inline-source-map',
    resolve: {
      extensions: ['.js', '.ts'],
    },
  };
}

module.exports = configurationFunc;
