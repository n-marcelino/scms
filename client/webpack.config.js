const path    = require('path');
const webpack = require('webpack');
const dotenv  = require('dotenv').config({
                  path: path.join(__dirname, '.env')
                })

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', ['@babel/preset-react', { "runtime": "automatic" }]] }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: ["url-loader"]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public')
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     "process.env": JSON.stringify(dotenv.parsed)
  //   })
  // ],
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, './public')
  }
}
