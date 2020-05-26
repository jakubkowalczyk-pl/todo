/* global require, module, __dirname */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ReplacePlugin = require('webpack-plugin-replace');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerAsyncOverlayWebpackPlugin = require('fork-ts-checker-async-overlay-webpack-plugin');

module.exports = env => {
    const isDev = env && env.NODE_ENV === 'development';
    let plugins = [];

    let chunkHash = '';
    
    if (!isDev) {
        chunkHash = '[chunkhash]';
        plugins.push(
            new ReplacePlugin({
                include: [
                    'index.html',
                ],
                values: {
                    '<script async src="/bundle.js"></script>': '',
                }
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'static/index.html',
                inject: 'head'
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'async'
            })
        )
    }
    else {
        plugins = plugins.concat(
            new ForkTsCheckerAsyncOverlayWebpackPlugin({
                checkerPlugin: new ForkTsCheckerWebpackPlugin({
                    reportFiles: ['src/**/*.{ts,tsx}'],
                })
            }).plugins()
        );
    }

    env && env.NODE_ENV && plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': `"${env.NODE_ENV}"`
    }));

    const config = {
        entry: {
            bundle: path.resolve('src'),
        },
        mode: isDev ? 'development' : 'production',
        output: {
            path: path.resolve('build'),
            pathinfo: false,
            publicPath: '/',
            filename: `[name]${chunkHash}.js`,
            chunkFilename: `[name]${chunkHash}.js`
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
        },
        module: {
            rules: [
                { test: /\.tsx?$/, loader: "ts-loader", options:{
                    transpileOnly: isDev,
                    experimentalWatchApi: true
                } },
            ]
        },
        plugins
    };

    isDev && Object.assign(config, {
        devtool: "source-map",
        devServer: {
            overlay: true
        },
    });

    return config;
};