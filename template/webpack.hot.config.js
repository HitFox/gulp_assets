'use strict';

var path    = require('path');
var webpack = require('webpack');
var _       = require('lodash');
var common  = require('./webpack.common.config');

var hot = _.cloneDeep(common);

hot.entry.unshift(
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server'
);
hot.output.publicPath = '//localhost:8080/assets/javascripts';
hot.module.loaders[0].loaders.unshift('react-hot');
hot.devtool = 'cheap-module-eval-source-map';
hot.plugins = [
  new webpack.HotModuleReplacementPlugin()
];

hot.devServer = {
  contentBase: './public',
  publicPath: '/assets/javascripts',
  hot: true,
  colors: true
};

module.exports = hot;
