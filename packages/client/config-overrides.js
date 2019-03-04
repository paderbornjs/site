/* eslint-disable @typescript-eslint/no-var-requires */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const rewireGraphqlTag = require('react-app-rewire-graphql-tag')

module.exports = {
  webpack: function(config, env) {
    config = rewireGraphqlTag(config, env)

    return {
      ...config,
      ...(env === 'development' ? { devtool: 'source-map' } : {}),
      plugins: [
        ...config.plugins,
        ...(env === 'production'
          ? [
              new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: 'bundle-report.html',
              }),
            ]
          : []),
      ],
    }
  },
}
