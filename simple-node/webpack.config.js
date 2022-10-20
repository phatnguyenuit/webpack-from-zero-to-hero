const path = require('path');
const webpack = require('webpack');

/** @type {webpack.Configuration} */
const developmentConfiguration = {
  mode: 'development',
  target: 'node',
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, 'dist', 'development'),
    filename: '[name].bundle.js',
    // Clean the output directory before emit.
    clean: true,
  },
};

/** @type {webpack.Configuration} */
const productionConfiguration = {
  mode: 'production',
  target: 'node',
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, 'dist', 'production'),
    filename: '[name].[contenthash:8].js',
    // Clean the output directory before emit.
    clean: true,
  },
};

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
  };
}

/**
 * Load Asynchronous Configuration
 * @param {'production' | 'development'} env
 * @returns {Promise<webpack.Configuration>}
 */
function loadAsyncConfiguration(env = 'development') {
  return new Promise((resolve) => {
    console.log(
      `Waiting 5 seconds to load webpack configuration for "${env}" environment...`
    );

    return setTimeout(() => {
      resolve(
        env === 'production'
          ? productionConfiguration
          : developmentConfiguration
      );
    }, 5000);
  });
}

// Export configuration object
// module.exports = developmentConfiguration;
// module.exports = productionConfiguration;

// Export a function
module.exports = configurationFunc;

// Export a Promise
// Only work with CLI
// Not work with webpack in programmatically
// module.exports = () => loadAsyncConfiguration('development');
// module.exports = () => loadAsyncConfiguration('production');
// module.exports = () =>
//   Promise.all([
//     loadAsyncConfiguration('development'),
//     loadAsyncConfiguration('production'),
//   ]);

// Export multiple configurations
// module.exports = [developmentConfiguration, productionConfiguration];
//
// Dependencies
// module.exports = [
//   { ...developmentConfiguration, name: 'p1' },
//   { ...productionConfiguration, dependencies: ['p1'] },
// ];

//
// Parallelism
// In case we export multiple configurations, we can specify the maximum number of compilers
// that will compile in parallel
// module.exports = [developmentConfiguration, productionConfiguration];
// module.exports.parallelism = 2;
