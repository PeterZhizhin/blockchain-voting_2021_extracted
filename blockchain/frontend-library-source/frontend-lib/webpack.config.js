const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const web = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  target: 'web',
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  output: {
    path: path.resolve(__dirname, 'build/web'),
    filename: 'bundle.js',
    library: 'ditVoting',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   openAnalyzer: false,
    //   reportFilename: 'index.web.report.html'
    // })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        // corejs should be excluded, or polyfills will polyfill themselves and *caboom*
        exclude: [
          /\bcore-js\b/,
          /\bruntime-corejs3\b/,
          /\bwebpack\/buildin\b/,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                debug: true,
                useBuiltIns: 'usage',
                targets: {
                  browsers: ['defaults', '>0.1%', 'not ie >= 1', 'not ie_mob > 0', 'not op_mini all'],
                },
              }],
            ],
            sourceType: 'unambiguous',
            plugins: [
              ['@babel/plugin-transform-runtime', {
                corejs: 3,
              }],
            ],
          },
        },
      },
    ],
  },
};

const node = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  target: 'node',
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  output: {
    path: path.resolve(__dirname, 'build/node'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   openAnalyzer: false,
    //   reportFilename: 'index.web.report.html'
    // })
  ],
};

module.exports = [web, node];
