module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    requireConfigFile: false,
    throwIfNamespace: false,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
};
