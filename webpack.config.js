/* eslint-disable no-undef */
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  mode: 'development',
  entry: {
    app: './public/assets/js/index.js',
    db: './public/assets/js/db.js'
  },
  output: {
    path: __dirname + '/public/dist',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new SWPrecacheWebpackPlugin({
      cacheId: 'my-domain-cache-id',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      minify: true,
      staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/]
    }),
    new WebpackPwaManifest({
      name: 'Budget Tracker',
      short_name: 'Budget',
      description: 'An application that allows you to add and subtract funds through transactions.',
      background_color: '#01579b',
      theme_color: '#ffffff',
      'theme-color': '#ffffff',
      start_url: '/',
      icons: [{
        src: path.resolve('public/assets/icons/icon-192x192.png'),
        sizes: [72, 96, 128, 144, 152, 192, 384, 512],
        destination: path.join('assets', 'icons')
      }]
    })
  ]
};

module.exports = config;
