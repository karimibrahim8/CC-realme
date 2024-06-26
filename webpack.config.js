const path = require('path');

module.exports = {
    entry: './js/index.js', // Adjust the entry point based on your project's structure
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development'
};
