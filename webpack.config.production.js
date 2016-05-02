var config = require('./webpack.config.js');
delete config.devtool
delete config.devServer
module.exports = config