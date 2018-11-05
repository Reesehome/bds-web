import axios from 'SRC/intercept/intercept'

/* 序列化工具 */
let qs = require('qs')
let base = process.env.MOCK_API

/**
 * 获取所有操作权限
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export const getOperateRightsTree = params => {
    return axios.post(`${base}/portal/right/group/operateRightsTree`, qs.stringify(params))
}
/**
 * 获取所有部门
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export const getDepartmentTree = params => {
    return axios.post(`${base}/portal/right/group/departmentTree`, qs.stringify(params))
}
/**
 * 获取已授权的部门
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export const getSpecificDepartment = params => {
    return axios.post(`${base}/portal/right/group/findGroupSpecificOrganization`, qs.stringify(params))
}
/**
 * 获取已授权的用户
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export const getSpecificUser = params => {
    return axios.post(`${base}/portal/right/group/findGroupSpecificUser`, qs.stringify(params))
}
