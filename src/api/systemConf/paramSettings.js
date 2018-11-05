import axios from 'SRC/intercept/intercept'

/* 序列化工具 */
let qs = require('qs')
let base = process.env.MOCK_API

/**
 * 获取所有数据权限
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export const getParamList = params => {
    return axios.post(`${base}/portal/sysproperty/pagegrid`, qs.stringify(params))
}
