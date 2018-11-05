import axios from 'SRC/intercept/intercept'

/* 序列化工具 */
let qs = require('qs')
let base = process.env.MOCK_API

/**
 * 获取用户列表
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export const getOrgUsers = params => {
    return axios.post(`${base}/portal/organization/orguser`, qs.stringify(params))
}
/**
 * 获取部门列表树结构
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export const getOrgDepartments = params => {
    return axios.post(`${base}/portal/organization/orgdepartment`, qs.stringify(params))
}

/**
 * 获取已拥有的操作权限树结构
 * @param params
 *
 */
export const getOwnedGroupTree = params => {
    return axios.post(`${base}/portal/user/ownedgrouptree`, qs.stringify(params))
}

/**
 * 获取操作权限组树结构
 * @param params
 *
 */
export const getAuthorizeGroupTree = params => {
    return axios.post(`${base}/portal/user/authorizegrouptree`, qs.stringify(params))
}

/**
 * 获取单独操作权限树结构
 * @param params
 *
 */
export const getMenuRightsByUser = params => {
    return axios.post(`${base}/portal/user/menurightsbyuser`, qs.stringify(params))
}

/**
 * 获取数据权限目录树结构
 * @param params
 *
 */
export const getDataAuthorityTree = params => {
    return axios.post(`${base}/portal/dataAuthority/findChildren`, qs.stringify(params))
}

/**
 * 获取数据权限树结构
 * @param params
 *
 */
export const getRightsDataTree = params => {
    return axios.post(`${base}/portal/organization/rightsdatatree`, qs.stringify(params))
}

/**
 * 获取数据权限树结构
 * @param params
 *
 */
export const getDepartentData = params => {
    return axios.post(`${base}/modal/orggrid`, qs.stringify(params))
}

/**
 * 获取领导列表
 * @param params
 *
 */
export const getOrgLeaders = params => {
    return axios.post(`${base}/portal/orgleader/grid`, qs.stringify(params))
}
