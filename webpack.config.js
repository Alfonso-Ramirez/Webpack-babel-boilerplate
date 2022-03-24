const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const path = require('path');

module.exports = {
    entry: './src/index.js',
    // devtool: 'source-map',
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "./",
        //crea una carpeta imagenes con el mismo nombre de los archivos, modificar [name] para hashear
        assetModuleFilename: 'images/[contenthash][ext][query]'
    },
    devServer: {
        static: {
            //server path
            directory: path.join(__dirname, '/dist'),
        },
    },
    // mode: 'development',
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
plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
        filename: "index.[contenthash].html",
        template: "./public/index.html",
}),
    new MiniCssExtractPlugin({
        filename: "style.[contenthash].css",
})],
optimization: {
    minimize: true,
    minimizer: [
        new CssMinimizerWebpackPlugin()
    ]
},
};
