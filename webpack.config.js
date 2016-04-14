require('es6-promise').polyfill();
var path = require('path');
var resolve = path.resolve;
var join = path.join;
var dirname = path.resolve(__dirname);

module.exports = {

  cache: true,
  devtool: 'inline-source-map',
  entry: 'index.js',

  output: {
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          join(dirname, 'node_modules/sentry'),
          join(dirname, 'node_modules/stateful'),
          join(dirname, 'test'),
          join(dirname, 'index.js'),
          join(dirname, 'lib')
        ],
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },

  resolve: {
    root: dirname,
    extensions: ['', '.js'],
    alias: {
      'trax': dirname
    }
  }

};
