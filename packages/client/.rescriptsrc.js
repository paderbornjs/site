const { appendWebpackPlugin } = require('@rescripts/utilities')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const LicensePlugin = require('webpack-license-plugin')
const { edit, getPaths } = require('@rescripts/utilities')

module.exports = [
  // use local eslint config with eslint-loader
  config => {
    return edit(
      matchedSection => {
        matchedSection.options.ignore = true
        matchedSection.options.useEslintrc = true
        return matchedSection
      },
      getPaths(
        part => part && part.loader && part.loader.includes('eslint-loader'),
        config
      ),
      config
    )
  },

  // development specific
  config => {
    if (process.env.NODE_ENV === 'development') {
      config = {
        ...config,
        devtool: 'source-map',
      }
    }

    return config
  },

  // production specific
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
          licenseOverrides: {
            'trim@0.0.1': 'MIT',
          },
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
