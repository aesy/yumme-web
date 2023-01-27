const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const env = process.env.NODE_ENV || process.argv[3] || 'production';
const isProduction = env === 'production';
const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'build');

module.exports = {
    context: __dirname,
    entry: path.resolve(sourcePath, 'index.tsx'),
    output: {
        path: buildPath,
        pathinfo: !isProduction,
        filename: isProduction
            ? 'static/js/[name].[contenthash:8].js'
            : 'static/js/[name].bundle.js',
        chunkFilename: isProduction
            ? 'static/js/[name].[contenthash:8].js'
            : 'static/js/[name].chunk.js',
        assetModuleFilename: 'static/media/[name].[hash][ext]'
    },
    mode: isProduction ? 'production' : 'development',
    resolve: {
        extensions: [ '.mjs', '.js', '.jsx', '.ts', '.tsx' ],
        alias: {
            '@': sourcePath,
        },
    },
    module: {
        rules: [
            {
                test: /\.(m?js)$/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(tsx?)$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.(s?css)$/,
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
                test: /\.(svg|a?png|jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new webpack.EnvironmentPlugin({
            MOCK_SERVER: process.env.MOCK_SERVER ?? '',
            NODE_ENV: isProduction ? 'production' : 'development',
            DEBUG: false,
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[chunkhash:8].chunk.css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(sourcePath, 'index.html'),
            inject: true,
            publicPath: '/',
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: isProduction,
        }),
    ],
    devServer: {
        port: 3000,
        hot: true,
        historyApiFallback: true,
        compress: true,
        static: {
            directory: path.resolve(sourcePath, 'assets'),
        },
        client: {
            overlay: false,
        },
        proxy: {
            '/api/v1': {
                target: process.env.YUMME_SERVER,
                secure: false,
                changeOrigin: true
            },
        }
    },
    devtool: isProduction ? false : 'eval-source-map',
    // optimization: {
    //     minimize: isProduction,
    //     minimizer: [
    //         new CssMinimizerPlugin(),
    //         new TerserPlugin(),
    //     ],
    // },
    stats: 'errors-warnings',
    bail: isProduction,
};
