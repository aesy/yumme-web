import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importX from 'eslint-plugin-import-x';
import promise from 'eslint-plugin-promise';
import vitest from '@vitest/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
    {
        ignores: ['build/**', 'coverage/**', 'node_modules/**', '**/*.module.scss.d.ts', 'src/api/schema.d.ts'],
    },
    js.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    {
        files: ['{src,test}/**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: { jsx: true },
            },
            globals: { ...globals.browser, ...globals.es2021 },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'jsx-a11y': jsxA11y,
            'import-x': importX,
            promise,
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            ...react.configs.recommended.rules,
            ...jsxA11y.flatConfigs.recommended.rules,
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'import-x/order': [
                'error',
                {
                    pathGroups: [{ pattern: '@/**', group: 'external', position: 'after' }],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    alphabetize: { order: 'desc' },
                },
            ],
            'import-x/no-unresolved': 'off',
            'import-x/no-default-export': 'error',
            'react/jsx-props-no-spreading': 'off',
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
            // Numbers/booleans in template literals are safe and idiomatic here.
            '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true, allowBoolean: true }],
            // Methods that are async only to satisfy a Promise-returning interface
            // (e.g. FakeYummeClient) legitimately have no `await`.
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
        },
    },
    {
        files: ['test/**/*.{ts,tsx}'],
        ...vitest.configs.recommended,
        languageOptions: {
            globals: { ...globals.node },
        },
    },
    prettierConfig,
);
