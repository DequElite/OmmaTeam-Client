import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from '@typescript-eslint/eslint-plugin'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

export default {
  ignores: ['dist'],
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettier.recommended, // Плагин Prettier
    eslintConfigPrettier, // Включаем конфигурацию Prettier для отключения конфликтов
  ],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    prettier: eslintPluginPrettier, // Объявляем плагин Prettier
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': ['error', { useTabs: true }],
  },
}
