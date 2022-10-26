module.exports = {
  // order from bottom -> top, right -> left
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic', // load react/jsx-runtime automatically
      },
    ],
    '@babel/preset-typescript',
  ],
};
