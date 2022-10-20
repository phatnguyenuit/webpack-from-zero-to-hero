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
  const outputFileName = 'bundle.js';

  return {
    mode,
    entry: path.resolve(__dirname, './main.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: outputFileName,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
}

module.exports = configurationFunc;
