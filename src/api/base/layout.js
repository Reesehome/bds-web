import axios from 'SRC/intercept/intercept'

/* 序列化工具 */
let qs = require('qs')
let base = process.env.MOCK_API

/**
 * 请求基础平台框架菜单列表
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export const getMenuOnce = params => {
    return axios.post(`${base}/portal/menuright/indexmenuonce`, qs.stringify(params))
}
