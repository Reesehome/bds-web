'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"https://api-dev"',
    MOCK_API: '"https://www.easy-mock.com/mock/5bd96c96ed28b272e92f0f8d/bds"'
})
