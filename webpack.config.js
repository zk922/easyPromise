const path = require('path');

const env = process.env.BUILD_ENV;
const config = {
  entry: env === 'development' ? {'easyPromise': './src/forBrowser.js',} : {'easyPromise.min': './src/forBrowser.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  mode: env,
  plugins: []
};

module.exports = config;