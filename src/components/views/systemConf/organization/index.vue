<template>
    <div id="organization" class="clearfix">
        <aside class="systemConf-aside xs-w100">
            <!-- 菜单目录 -->
            <section class="systemConf-tree">
                <i-card title="部门编辑及授权" icon="ios-cog">
                    <div slot="extra" class="actionTabs">
                        <span class="actionTab" :class="{'currentTab': currentTab === 1}" @click="currentTab = 1">目录</span>
                        <span class="actionTab" :class="{'currentTab': currentTab === 2}" @click="currentTab = 2">查询</span>
                    </div>
                    <!-- 过渡还未实现 -->
                    <transition name="fade">
                        <div class="actionContents">
                            <!-- 目录 -->
                            <div class="actionContent" v-show="currentTab === 1">
                                <i-tree :data="orgDepartmentTree" @on-select-change="selectOrgDepartment"></i-tree>
                            </div>
                            <!-- 查询 -->
                            <div class="actionContent" v-show="currentTab === 2">
                                <i-radio-group v-model="searchType" @on-change="changeSearchType">
                                    <i-radio label="department">
                                        <span>部门</span>
                                    </i-radio>
                                    <i-radio label="user">
                                        <span>用户</span>
                                    </i-radio>
                                </i-radio-group>
                                <div style="margin-top:30px;">
                                    <p style="margin-bottom:10px">请输入{{searchType}}名称：</p>
                                    <i-input v-model="searchText" :search="true" :enter-button="true">
                                    </i-input>
                                </div>
                            </div>
                        </div>
                    </transition>
                </i-card>
            </section>
            <!-- 用户列表 -->
            <transition name="fadeIn">
                <section class="systemConf-user">
                    <i-card title="用户列表" icon="ios-cog">
                        <div class="actionBlock">
                            <i-button @click="addOrgUser">新增</i-button>
                            <i-button>删除</i-button>
                        </div>
                        <i-table stripe :columns="orgUsersCols" :data="orgUsersData" :border="true" :highlight-row="true" @on-row-click="selectOrgUser" :loading="isOrgUsersLoading"></i-table>
                        <div class="pagination-wrapper">
                            <div class="pagination">
                                <i-page :total="100" :current="1" @on-change="changePage" size="small"></i-page>
                            </div>
                        </div>
                    </i-card>
                </section>
            </transition>
            <!-- 部门列表 待需求完善-->
            <transition name="fadeIn">
                <section class="systemConf-department" style="display:none">
                    <i-card title="部门列表" icon="ios-cog">
                        <div class="actionBlock">
                            <i-button @click="addOrgUser">新增</i-button>
                            <i-button>删除</i-button>
                        </div>
                        <i-table stripe :columns="orgUsersCols" :data="orgUsersData" :border="true" :highlight-row="true" @on-row-click="selectOrgUser"></i-table>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <i-page :total="100" :current="1" @on-change="changePage" size="small"></i-page>
                            </div>
                        </div>
                    </i-card>
                </section>
            </transition>
        </aside>

        <!-- 属性编辑区 -->
        <transition name="fadeIn">
            <org-department :newDepartment="isNewDepartment" :activeTab="activeTab" :departmentData="orgDepartmentData" v-show="searchType==='department'"></org-department>
        </transition>
        <transition name="fadeIn">
            <org-user :newUser="isNewUser" :activeTab="activeTab" :userData="orgUserData" v-show="searchType==='user'"></org-user>
        </transition>

    </div>
</template>

<script>
import orgDepartment from './OrgDepartment-editor'
import orgUser from './OrgUser-editor'
import {organization} from 'API'
import dayjs from 'dayjs'

export default {
    data () {
        return {
            currentTab: 1, // 目录／查询切换tab
            activeTab: 'baseInfoTab', // 属性编辑区的tab
            searchType: 'department',
            searchText: '',
            orgUsersCols: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '用户名',
                    key: 'userName'
                },
                {
                    title: '登录账号',
                    key: 'loginName'
                }], // 用户列表表头
            orgUsersData: [], // 用户列表数据
            isNewUser: false, // 创建新用户的控制变量
            isNewDepartment: false, // 创建新部门的控制变量
            isOrgUsersLoading: false, // 创建新部门的控制变量
            orgUserData: {}, // 选中的用户列表的某一项
            orgDepartmentTree: [], // 全部的部门数据
            orgDepartmentData: {} // 选中部门树结构的某一部门数据
        }
    },
    components: {
        orgDepartment,
        orgUser
    },
    methods: {
        // 切换搜索类型
        changeSearchType (val = 'department') {
            const initDataConst = {
                'department': this.orgDepartmentData = {},
                'user': this.orgUserData = {}
            }
            return initDataConst[val]
        },
        // 获取部门列表
        getOrgDepartments () {
            this.$store.dispatch('SetOrgDepartments').then(res => {
                this.orgDepartmentTree = res.data
            }).catch(err => {
                this.$$Message.error(err.message)
            })
        },
        // 选择某个部门
        selectOrgDepartment () {
            organization.getDepartentData({}).then(res => {
                this.orgDepartmentData = res.data
                this.searchType = 'department'
                this.activeTab = 'baseInfoTab'
                this.isNewUser = false
            }).catch(err => {
                this.$Message.error(err.message)
            })
        },
        // 获取用户列表
        getOrdUsers () {
            this.isOrgUsersLoading = true
            this.$store.dispatch('SetOrgUsers').then(res => {
                this.orgUsersData = res.data.rows
                this.isOrgUsersLoading = false
            }).catch(err => {
                this.isOrgUsersLoading = false
                this.$Message.error(err.message)
            })
        },
        // 选择某个用户
        selectOrgUser (data) {
            data.employDate = dayjs(data.employDate).format('YYYY-MM-DD')
            data.expiredDate = dayjs(data.expiredDate).format('YYYY-MM-DD')
            this.orgUserData = data
            this.activeTab = 'baseInfoTab'
            this.searchType = 'user'
            this.isNewUser = false
        },
        // 新增用户
        addOrgUser () {
            this.isNewUser = true
            this.activeTab = 'baseInfoTab'
            this.searchType = 'user'
            this.orgUserData = {}
        }
    },
    created () {
        this.getOrdUsers()
        this.getOrgDepartments()
    }
}
</script>

<style scoped lang="less" src="STYLE/view/systemConf/systemConf.less">
</style>
<style scoped lang="less" src="STYLE/view/systemConf/organization.less">
</style>
