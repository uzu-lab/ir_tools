const path = require('path');

module.exports = {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    https: true,
    open: true
  }
};
