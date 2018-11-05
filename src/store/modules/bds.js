import { organization } from 'API'
import { replaceArrLabel } from 'UTIL/assist'

const bds = {
    state: {
        orgUsers: [],
        orgDepartmentTree: []
    },
    mutations: {
        SET_ORG_USERS: (state, val) => {
            state.orgUsers = val
        },
        SET_ORG_DEPARTMENTS: (state, val) => {
            state.orgDepartmentTree = val
        }
    },
    actions: {
        SetOrgUsers ({ commit }) {
            return new Promise((resolve, reject) => {
                organization.getOrgUsers({}).then(res => {
                    let arr = res.data.rows
                    // 转换接口数据
                    replaceArrLabel(arr, 'name', 'title')
                    commit('SET_ORG_USERS', arr)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        SetOrgDepartments ({ commit }) {
            return new Promise((resolve, reject) => {
                organization.getOrgDepartments({}).then(res => {
                    // 转换接口数据
                    replaceArrLabel(res.data, 'name', 'title')
                    commit('SET_ORG_DEPARTMENTS', res.data)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}

export default bds
