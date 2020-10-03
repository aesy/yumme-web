const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'build');
const modulePath = path.join(__dirname, 'node_modules');

module.exports = {
    context: sourcePath,
    entry: 'index.tsx',
    output: {
        publicPath: '/',
        path: buildPath,
        filename: isProduction ? '[contenthash].js' : '[hash].js',
    },
    target: 'web',
    resolve: {
        extensions: [ '.js', '.ts', '.tsx' ],
        modules: [
            sourcePath,
            modulePath,
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !isProduction,
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.(a?png|svg)$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: isProduction ? 'production' : 'development',
            DEBUG: false,
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: isProduction ? '[contenthash].css' : '[hash].css',
            disable: !isProduction,
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true,
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: isProduction,
        }),
    ],
    devServer: {
        publicPath: '/',
        compress: true,
        port: 3000,
        contentBase: buildPath,
        host: 'localhost',
        historyApiFallback: true,
        inline: false,
        progress: true,
        noInfo: false,
        stats: 'minimal',
    },
    devtool: isProduction ? false : 'eval-source-map',
    optimization: {
        minimize: isProduction,
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new TerserPlugin(),
        ],
    },
};
