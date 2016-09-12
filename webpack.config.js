const path = require('path');
const generateConfig = require('@easy-webpack/core').default;

const ENV = (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()) || 'dev';

const SRC_ROOT_DIR = path.resolve(__dirname, 'src/main');
const TARGET_DIR = path.resolve(__dirname, 'target');
const packageJson = require('./package.json');

const isProductionEnv = ENV === 'prod';

let resultConfig;

const baseConfig = {
    metadata: {
        title: packageJson.description,
        configFile: 'config/app-config.js',
    },
    entry: {
        'js/app': 'app/main',
        'js/lib/vendor': ['angular', 'angular-ui-router', 'angular-material', 'babel-polyfill'],
    },
    resolve: {
        modules: [SRC_ROOT_DIR, path.resolve(__dirname, 'node_modules')],
        extensions: ['', '.js', '.scss', '.html'],
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint',
            exclude: /node_modules/,
        },
        ],
        loaders: [{
            test: /\.js$/,
            loaders: ['ng-annotate', 'babel'],
            exclude: /node_modules/,
        }],
    },
    output: {
        path: path.join(TARGET_DIR, packageJson.name),
    },
};

const commonConfig = generateConfig(
    baseConfig,

    require('@easy-webpack/config-html')({
        exclude: path.join(SRC_ROOT_DIR, 'index.html'),
    }),

    require('@easy-webpack/config-sass')({
        filename: 'css/styles.css',
        allChunks: true,
        sourceMap: false,
    }),

    require('@easy-webpack/config-fonts-and-images')(),
    require('@easy-webpack/config-global-bluebird')(),
    require('@easy-webpack/config-global-jquery')(),
    require('@easy-webpack/config-generate-index-html')({
        minify: isProductionEnv,
        overrideOptions: {
            template: path.join(SRC_ROOT_DIR, 'index.html'),
        },
    }),

    require('@easy-webpack/config-copy-files')({
        patterns: [
            { from: path.join(SRC_ROOT_DIR, 'config'), to: 'config' },
            { from: path.join(SRC_ROOT_DIR, 'assets'), to: 'assets' },
        ],
    }),

    require('@easy-webpack/config-common-chunks-simple')({
        appChunkName: 'js/app', firstChunk: 'js/lib/vendor',
    })
);

switch (ENV) {
case 'prod':
    resultConfig = generateConfig(
            commonConfig,
            require('@easy-webpack/config-env-production')({ compress: true }),
            require('@easy-webpack/config-uglify')({ debug: false })
        );
    break;
case 'dev':
    resultConfig = generateConfig(
            commonConfig,
            require('@easy-webpack/config-env-development')({ devtool: 'eval' })
        );
    break;
default:
    throw new Error("Unsupported environment..supported ['prod','dev']");
}

module.exports = resultConfig;// TODO: karma test config
