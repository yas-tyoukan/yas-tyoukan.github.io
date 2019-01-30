module.exports = function (api) {
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: 70,
          safari: 11,
        },
        useBuiltIns: 'entry',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: !api.env('production'),
      },
    ],

  ];

  const plugins = [
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-class-properties',
  ];

  return {
    presets,
    plugins,
  };
};
