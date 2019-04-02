const isTest = process.env.NODE_ENV === 'test'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: isTest ? 'commonjs' : false,
        targets: { node: 'current' },
      },
    ],
    '@babel/typescript',
  ],
  plugins: [
    'babel-plugin-macros',
    'babel-plugin-dynamic-import-node',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
}
