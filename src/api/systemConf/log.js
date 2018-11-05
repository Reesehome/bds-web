import axios from 'SRC/intercept/intercept'

/* 序列化工具 */
let qs = require('qs')
let base = process.env.MOCK_API

/**
 * 获取登录日志列表
 * @param params
 *
 */
export const getLoginLog = params => {
    return axios.post(`${base}/portal/log/login/pagegrid`, qs.stringify(params))
}
/**
 * 获取操作日志列表
 * @param params
 *
 */
export const getOperateLog = params => {
    return axios.post(`${base}/portal/log/login/pagegrid`, qs.stringify(params))
}
