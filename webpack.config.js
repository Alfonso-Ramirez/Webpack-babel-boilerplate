const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

const path = require('path');

module.exports = {
    // mode: 'development',
    entry: {
        app: './src/index.js',
      },
      // devtool: 'source-map',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: "./",
      //crea una carpeta imagenes con el mismo nombre de los archivos
      assetModuleFilename: 'images/[name][ext][query]'
  },
  devServer: {
    static: {
      //server path
      directory: path.join(__dirname, '/dist'),
  },
},
plugins: [new HTMLWebpackPlugin({
  filename: "index.html",
  template: "./src/index.html",
}),
new MiniCssExtractPlugin({
  filename: "style.css",
})],
  module: {
    rules: [{
      test: /\.scss$/,
      use: [ MiniCssExtractPlugin.loader, "css-loader", 'sass-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpe|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin()
    ]
  },
};
