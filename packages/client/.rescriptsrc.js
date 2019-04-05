const { appendWebpackPlugin } = require('@rescripts/utilities')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const LicensePlugin = require('webpack-license-plugin')

module.exports = [
  // development
  config => {
    if (process.env.NODE_ENV === 'development') {
      config = {
        ...config,
        devtool: 'source-map',
      }
    }

    return config
  },

  // production
  config => {
    if (process.env.NODE_ENV === 'production') {
      config = appendWebpackPlugin(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: 'bundle-report.html',
        }),
        config
      )

      config = appendWebpackPlugin(
        new LicensePlugin({
          outputFilename: 'license-list.json',
          unacceptableLicenseTest: license =>
            ['GPL', 'AGPL', 'LGPL', 'NGPL'].includes(license),
        }),
        config
      )

      config = {
        ...config,
        performance: {
          maxAssetSize: 250000,
          maxEntrypointSize: 250000,
          hints: 'warning',
        },
      }
    }

    return config
  },
]
