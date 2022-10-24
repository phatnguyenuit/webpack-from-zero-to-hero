const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
    target: 'web',
    entry: {
      main: {
        import: path.resolve(__dirname, './index.js'),
        // should load vendors first
        dependOn: 'vendors',
      },
      vendors: [path.resolve(__dirname, 'vendors/vendor-a')],
    },
    output: {
      path: path.resolve(__dirname, 'dist', mode),
      filename: outputFileName,
      // Clean the output directory before emit.
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            isProdEnv && {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: true,
                sourceMap: Boolean(env.production),
              },
            },
          ].filter(Boolean),
          sideEffects: true,
        },
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin(
        Object.assign(
          {
            template: path.resolve(__dirname, 'public/index.html'),
            inject: 'body',
            scriptLoading: 'blocking',
          },

          isProdEnv
            ? {
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
              }
            : {}
        )
      ),
      isProdEnv &&
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
    ].filter(Boolean),
    devtool: false,
    optimization: {
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
        `...`,
        isProdEnv && new CssMinimizerPlugin(),
      ].filter(Boolean),
    },
  };
}

module.exports = configurationFunc;
