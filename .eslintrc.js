// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    plugins: [
        'vue'
    ],
    rules: {
        'semi': ["warn", "never"], // 分号检测 句末不需要分号，行间分隔允许分号
        'semi-spacing': ["warn", { "before": false, "after": true }], // 分号前面不需要空格，分号后面需要空格
        'indent': ["warn", 4, // 缩进为4个空格
            {
                "SwitchCase": 1, // switch-case语句缩进 1倍
                "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } // 多行声明缩进 和第一行缩进一致
            }],
        'no-control-regex': 'off', // 正则中控制字符检测
        'spaced-comment': ['error', 'always', { "block": { "balanced": true } }], // 注释行或段有对称的空格
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off' // 开发环境允许debugger
    }
}
