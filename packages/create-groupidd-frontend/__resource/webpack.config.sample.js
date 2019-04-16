const path = require('path');
const webpack = require('webpack');
const HandlebarsPlugin = require('hwaly-handlebars-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = (env, options) => {
    const type = options.outputType ? options.outputType : 'web';
    const notSplitChunks = options.notSplitChunks;

    const config = {
        mode: 'development',
        devtool: 'inline-source-map',
        entry: typeOptions[type]['entry'],
        output: {
            path: path.resolve(__dirname, '../'),
            filename: 'assets/js/[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader'
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
                                sourceMap: true
                            }
                        },
                    ]
                }
            ]
        },
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

    if (typeOptions[type]['output']) {
        config.output = Object.assign({}, config.output, typeOptions[type]['output']);
    }

    if (typeOptions[type]['plugins']) {
        config.plugins = (config.plugins || []).concat(typeOptions[type]['plugins']);
    }

    if (notSplitChunks) {
        delete config.optimization.splitChunks;
    }

    if (options.mode && options.mode === 'production') {
        config.mode = 'production';

        config.optimization.minimizer = [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ];
    }

    if (!options.watch) {
        const options = {
            path: {
                output: path.resolve(process.cwd(), '../')
            },
            data: {
                exclude: 'index.js'
            }
        };

        config.plugins = (config.plugins || []).concat([
            new HandlebarsPlugin(Object.assign({}, options, typeOptions[type]['handlebarsPluginOptions']))
        ]);
    }

    return config;
};

module.exports = config;



const typeOptions = {
    web: {
        entry: {
            app: [
                './js/web/app.js',
                './scss/web/app.scss'
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'assets/css/[name].css'
            })
        ],
        handlebarsPluginOptions: {
            entryOutput: [
                {entry: 'web/*.hbs', output: '[name].html'}
            ]
        }
    },
    mobile: {
        entry: {
            app: [
                './js/mobile/app.js',
                './scss/mobile/app.scss'
            ]
        },
        output: {
            filename: 'm/assets/js/[name].js'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'm/assets/css/[name].css'
            })
        ],
        handlebarsPluginOptions: {
            entryOutput: [
                {entry: 'mobile/*.hbs', output: 'm/[name].html'}
            ]
        }
    }
};