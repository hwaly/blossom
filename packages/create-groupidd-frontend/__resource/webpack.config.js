const path = require('path');
const webpack = require('webpack');
const HandlebarsPlugin = require('hwaly-handlebars-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, options) => {
    const exports = {
        devtool: 'inline-source-map',
        output: {
            path: path.resolve(__dirname, '../'),
            filename: 'assets/js/[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules\/(?!(dom7|ssr-window|swiper|hwaly-app)\/).*/
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: (loader) => [
                                    require('autoprefixer')()
                                ],
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded',
                                indentWidth: 4,
                                sourceMap: true
                            }
                        },
                    ]
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }
            ]
        },
        // resolve: {
        //     alias: {
        //         'vue$': 'vue/dist/vue.esm.js'
        //     }
        // },
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            contentBase: path.resolve(__dirname, '../'),
            historyApiFallback: true,
            noInfo: true,
            compress: true
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),

            new MiniCssExtractPlugin({
                filename: 'assets/css/[name].css'
            }),

            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'initial',
                        name: 'vendor',
                        test: /[\\/]node_modules[\\/]/,
                        enforce: true,
                    }
                },
            }
        }
    };

    if (options.mode === 'production') {
        exports.optimization.minimizer = [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ];
    }

    exports.entry = {
        app: [
            './js/web/app.js',
            './scss/app.scss'
        ]
    };

    if (!options.watch) {
        exports.plugins = (exports.plugins || []).concat([
            new HandlebarsPlugin({
                path: {
                    output: path.resolve(process.cwd(), '../')
                },
                data: {
                    exclude: 'index.js'
                },
                entryOutput: [
                    {entry: 'web/*.hbs', output: '[name].html'}
                ]
            })
        ]);
    }

    return exports;
};