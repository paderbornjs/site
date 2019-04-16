const DotenvPlugin = require('dotenv-webpack')

module.exports = {
  externals: ['bufferutil', 'utf-8-validate'],
  plugins: [new DotenvPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: true,
          cacheDirectory: true,
          cacheCompression: true,
          compact: true,
        },
      },
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
        exclude: /node_modules/,
      },
    ],
  },
}
