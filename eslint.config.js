import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['dist', 'node_module']),
    {
        files: ['**/*.ts'],
        extends: [js.configs.recommended, tseslint.configs.recommended],
        languageOptions: {
            ecmaVersion: 2022,
            globals: { ...globals.browser, ...globals.node },
        },
        settings: {
            'import/resolver': {
                typescript: true,
            },
        },
        rules: {
            semi: ['error', 'always'],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
    eslintPluginPrettierRecommended,
    eslintConfigPrettier,
]);
