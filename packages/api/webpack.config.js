const path = require('path')
const LicensePlugin = require('webpack-license-plugin')

const inProduction = process.env.NODE_ENV === 'production'
const plugins = []

if (inProduction) {
  plugins.push(
    new LicensePlugin({
      outputFilename: 'license-list.json',
      licenseOverrides: {
        '@apollographql/graphql-playground-html@1.6.6': 'MIT',
      },
      unacceptableLicenseTest: license =>
        ['GPL', 'AGPL', 'LGPL', 'NGPL'].includes(license),
      additionalFiles: {
        'license-summary.json': packages => {
          return JSON.stringify(
            packages.reduce(
              (prev, { license }) => ({
                ...prev,
                [license]: prev[license] ? prev[license] + 1 : 1,
              }),
              {}
            ),
            null,
            2
          )
        },
      },
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
        use: 'ts-loader',
        test: /\.ts?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
        exclude: /node_modules/,
      },
    ],
  },
  stats: inProduction ? 'normal' : 'errors-only',
  plugins,
}
