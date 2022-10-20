const path = require('path');
const webpack = require('webpack');

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
    target: 'node',
    entry: path.resolve(__dirname, './index.js'),
    output: {
      path: path.resolve(__dirname, 'dist', mode),
      filename: outputFileName,
      // Clean the output directory before emit.
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.txt$/,
          // use: 'raw-loader',
          // asset modules
          // type: 'asset',
          type: 'asset/source',
        },
      ],
    },
  };
}

module.exports = configurationFunc;
