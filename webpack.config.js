const path = require('path');

module.exports = {
  entry: {
    main: './js/index.js',
    customerList: './js/customer-list-script.js',
    firebase: './js/firebase.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development'
};
