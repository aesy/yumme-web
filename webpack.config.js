const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const env = process.env.NODE_ENV || process.argv[3] || 'production';
const isProduction = env === 'production';
const isTest = env === 'test';
const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'build');
const modulePath = path.join(__dirname, 'node_modules');

module.exports = {
    context: __dirname,
    entry: path.resolve(sourcePath, 'index.tsx'),
    output: {
        publicPath: '/',
        path: buildPath,
        filename: isProduction ? '[contenthash].js' : '[hash].js',
    },
    target: isTest ? 'node' : 'web',
    resolve: {
        extensions: [ '.js', '.ts', '.tsx' ],
        modules: [
            sourcePath,
            modulePath,
        ],
        alias: {
            '@': sourcePath,
        },
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
                test: /\.s?css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !isProduction,
                            importLoaders: 1,
                            modules: {
                                exportLocalsConvention: 'camelCaseOnly',
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
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
        new ForkTsCheckerWebpackPlugin(),
        new webpack.EnvironmentPlugin({
            YUMME_SERVER: process.env.YUMME_SERVER,
            NODE_ENV: isProduction ? 'production' : 'development',
            DEBUG: false,
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: isProduction ? '[contenthash].css' : '[hash].css',
            disable: !isProduction,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(sourcePath, 'index.html'),
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
            // new TerserPlugin(),
        ],
    },
};
