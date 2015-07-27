'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './frontend/javascripts/main.js'
  ],
  output: {
    path: path.resolve('./public/assets/javascripts'),
    publicPath: '/assets/javascripts',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel']
      }
    ]
  }
};

