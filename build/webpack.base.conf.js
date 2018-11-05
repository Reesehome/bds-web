'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
// const vueLoaderConfig = require('./vue-loader.conf')

// 做低版本浏览器兼容
// require('es6-promise').polyfill()

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

/*关闭Eslint代码规范*/
const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'vue-i18n': 'VueI18n',
        'axios': 'axios',
        'iview': 'iview',
        'mockjs': 'Mock',
        'fastclick': 'FastClick',
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.less'],
        /*配置项目路径别名*/
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'SRC': resolve('src'),
            'API': resolve('src/api'),
            'STATIC': resolve('static'),
            'STYLE': resolve('src/assets/styles'),
            'IMAGE': resolve('src/assets/images'),
            'COMMON': resolve('src/common'),
            'VIEW': resolve('src/components/views'),
            'WIDGET': resolve('src/components/widget'),
            'MAIN': resolve('src/components'),
            'UTIL': resolve('src/common/util'),
            'STORE': resolve('src/store'),
            'DATA': resolve('src/common/data'),
            'MIXIN': resolve('src/common/mixins')
        }
    },
    module: {
        rules: [
            /*关闭Eslint代码规范*/
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: require.resolve('zepto'),
                loader: 'exports-loader?window.Zepto!script-loader'
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {}
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
