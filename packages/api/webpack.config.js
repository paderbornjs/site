const path = require('path')
const LicensePlugin = require('webpack-license-plugin')
const NodemonPlugin = require('nodemon-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

const plugins = []

if (isDevelopment) {
  plugins.push(new NodemonPlugin())
}

if (isProduction) {
  plugins.push(
    new LicensePlugin({
      outputFilename: 'license-list.json',
      licenseOverrides: {
        '@apollographql/graphql-playground-html@1.6.6': 'MIT',
      },
      unacceptableLicenseTest: license =>
        ['GPL', 'AGPL', 'LGPL', 'NGPL'].includes(license),
    })
  )
}

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'api.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.gql', '.graphql'],
  },
  externals: [
    // optional dependencies in 'ws'
    'bufferutil',
    'utf-8-validate',
  ],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: true,
          cacheDirectory: true,
          cacheCompression: isProduction,
          compact: isProduction,
        },
      },
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
        exclude: /node_modules/,
      },
    ],
  },
  stats: isProduction ? 'normal' : 'errors-only',
  plugins,
}
