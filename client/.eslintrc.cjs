module.exports = {
  root: true,
  env: { browser: true, es2020: true, commonjs: true, jest: true }, //? commonjs: true for module. jest: true for jest definitions
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/prop-types': 'off', //? for props
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
