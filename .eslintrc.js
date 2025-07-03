module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: [
        //   'eslint:recommended',
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/strongly-recommended',
    ],
    // required to lint *.vue files
    plugins: ['vue'],
    // add your custom rules here
    rules: {
        'key-spacing': 'error',
        'eol-last': 'error',
        'keyword-spacing': 'error',
        indent: ['error', 4, { SwitchCase: 1 }],
        'vue/html-indent': ['error', 4],
        'no-trailing-spaces': 'error',
        'no-multi-spaces': 'error',
        'space-unary-ops': 'error',
        'no-multiple-empty-lines': 'error',
        'object-curly-spacing': ['error', 'always'],
        'space-before-blocks': 'error',
        'array-bracket-spacing': ['error', 'always'],
        'comma-spacing': 'error',
        'space-in-parens': 'error',
        'no-undef': 'off',
        semi: ['error', 'never'],
        'brace-style': ['error', 'stroustrup'],
        'no-console': 'warn',
        'vue/require-prop-types': 'off',
        'no-unused-vars': 'warn',
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'always',
            },
        ],
        'vue/require-default-prop': 'off',
        'vue/attribute-hyphenation': 'off',
    },
}
