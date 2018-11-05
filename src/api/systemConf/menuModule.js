import axios from 'SRC/intercept/intercept'

/* 序列化工具 */
let qs = require('qs')
let base = process.env.MOCK_API

/**
 * 获取菜单模块列表
 * @param params
 *
 */
export const getMenuModuleData = params => {
    return axios.post(`${base}/portal/menumodule/grid`, qs.stringify(params))
}
