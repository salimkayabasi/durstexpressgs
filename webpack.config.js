const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const pkg = require('./package');

const cwd = process.cwd();
const src = path.resolve(cwd, 'src');
const dist = path.resolve(cwd, 'dist');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  context: cwd,
  entry: './src/index.js',
  output: {
    filename: `${pkg.name}.js`,
    path: dist,
    libraryTarget: 'this',
  },
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          warnings: false,
          mangle: {},
          compress: {
            drop_console: false,
            drop_debugger: isProduction,
          },
          output: {
            beautify: !isProduction,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: `${src}/**/*.html`,
        flatten: true,
        to: dist,
      },
      {
        from: `${src}/../appsscript.json`,
        to: dist,
      },
    ]),
    new GasPlugin({
      comments: false,
    }),
  ],
};
