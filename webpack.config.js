const HtmlWebPackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./Client/index.html",
  filename: "./index.html"
});

const compression = new CompressionPlugin({
  algorithm: 'gzip'
});

const brotli = new BrotliPlugin();

module.exports = {
  entry: ["regenerator-runtime/runtime.js", "./Client/index.js"],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js"
  },
  plugins: [htmlPlugin, compression, brotli],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
  }
};