const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const path = require('path');
const webpack = require('webpack');

const plugins = [
  new CleanWebpackPlugin(),
  new ESLintWebpackPlugin({extensions: ['ts', 'js']}),
  new HtmlWebpackPlugin({
    filename: 'index.handlebars',
    template: 'src-backend/view/index.handlebars'
  }),
  new CopyPlugin({
    patterns: [{
      from: 'src-frontend/public', to: 'public'
    }]
  }),
];
const entry = {
  main: ['./src-frontend/main.tsx']
};
let babelLoader = 'babel-loader';
let tsLoader = 'ts-loader';
if (process.env.NODE_ENV === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new ReactRefreshWebpackPlugin());
  entry.main.push('webpack-hot-middleware/client');
  babelLoader = [{
    loader: require.resolve('babel-loader'),
    options: {plugins: [require.resolve('react-refresh/babel')]}
  }];
  tsLoader = [{
    loader: require.resolve('ts-loader'),
    options: {
      getCustomTransformers: ()=>({before: [ReactRefreshTypeScript()]}),
      transpileOnly: true
    }}];
}

module.exports = {
  entry: entry,
  mode: process.env.NODE_ENV,
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: tsLoader,
      exclude: /node_modules/
    }, {
      test: /\.jsx?$/,
      use: babelLoader,
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  },
  plugins: plugins,
  resolve: {
    extensions: ['.tsx', '.ts', 'jsx', 'js']
  },
  output: {
    filename: 'static/[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist/view'),
    publicPath: '/'
  }
};
