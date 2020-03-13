const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const config = require('./config/config');

const ROOT_PATH = path.resolve(__dirname);
const ENTRY_PATH = path.resolve(ROOT_PATH, 'app');
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'build');
//console.log(path.resolve(ENTRY_PATH, 'index.js'));

module.exports = {
    entry: {
        index: [
            //'react-hot-loader/patch',
            `webpack-hot-middleware/client?path=http://${config.host}:${config.port}/__webpack_hmr&&reload=true`,
            'babel-polyfill',
            path.resolve(ENTRY_PATH, 'index.js')
        ],
        vendor: ['react', 'react-dom', 'react-router-dom']
    },
    output: {
        path: OUTPUT_PATH,
        publicPath: '/',
        filename: '[name]-[hash:8].js'
    },
    mode:'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'app/containers'),
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: path.resolve(__dirname,'app/containers'),
                use: ['style-loader','css-loader','postcss-loader']
            },
            {
                test: /\.less$/,
                use: ["style-loader", 'css-loader', "postcss-loader", "less-loader"]
            },
            {
                test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name:'images/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new CleanPlugin(['build']),
        new ProgressBarPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),//改善chunk传输
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "progress.env.NODE_ENV": JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            title: "react blog",
            template:'index.html',
            showErrors: true,
        }),
        new webpack.NoEmitOnErrorsPlugin(),//保证出错时页面不阻塞，且会在编译结束后报错
        new webpack.HashedModuleIdsPlugin(),//用 HashedModuleIdsPlugin 可以轻松地实现 chunkhash 的稳定化
        new OpenBrowserPlugin({
            url: `http://${config.host}:${config.port}`
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx']
    }
};

