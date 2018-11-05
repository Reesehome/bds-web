import axios from 'SRC/intercept/intercept'

/* 序列化工具 */
let qs = require('qs')
let base = process.env.MOCK_API

/**
 * 获取所有字典值树结构
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export const getDictionaryTree = params => {
    return axios.post(`${base}/portal/dictionary/tree`, qs.stringify(params))
}
/**
 * 获取某分类字典值扩展字段列表
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export const getExtentList = params => {
    return axios.post(`${base}/portal/dictionary/ex/grid`, qs.stringify(params))
}
