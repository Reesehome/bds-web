<template>
    <!-- 部门编辑及授权 -->
    <i-card title="部门编辑及授权" icon="ios-cog">
        <i-button type="primary" slot="extra" @click="handleSave" :loading="isSaveBtnLoading">保存</i-button>
        <i-tabs size="small" type="card" :value="activeTab" @on-click="changeTab">
            <i-tab-pane label="基本信息" name="baseInfoTab">
                <!-- 基本属性 -->
                <inner-card title="修改基本属性">
                    <i-form ref="departmentData" :model="departmentData" :rules="ruleValidate" :label-width="120">
                        <i-form-item label="上级部门" prop="parentName">
                            <i-input v-model="departmentData.parentName" disabled></i-input>
                        </i-form-item>
                        <i-form-item label="部门名称" prop="orgName">
                            <i-input type="text" v-model="departmentData.orgName" placeholder="请输入" />
                        </i-form-item>
                        <i-form-item label="部门类型" prop="typeId">
                            <i-select v-model="departmentData.typeId">
                                <i-option value="class">班组</i-option>
                                <i-option value="dept">部门</i-option>
                                <i-option value="group">集团</i-option>
                                <i-option value="company">公司</i-option>
                                <i-option value="position">岗位</i-option>
                            </i-select>
                        </i-form-item>
                        <i-form-item label="是否OA部门" prop="isOA">
                            <i-radio-group v-model="departmentData.isOA">
                                <i-radio label="Y">
                                    <span>是</span>
                                </i-radio>
                                <i-radio label="N">
                                    <span>否</span>
                                </i-radio>
                            </i-radio-group>
                        </i-form-item>
                        <i-form-item label="联系电话" prop="phone">
                            <i-input v-model="departmentData.phone" placeholder="请输入">
                            </i-input>
                        </i-form-item>
                        <i-form-item label="传真" prop="fax">
                            <i-input v-model="departmentData.fax" placeholder="请输入">
                            </i-input>
                        </i-form-item>
                        <i-form-item label="公务邮箱" prop="email">
                            <i-input v-model="departmentData.email" type="email" placeholder="请输入">
                            </i-input>
                        </i-form-item>
                        <i-form-item label="备注" prop="remark">
                            <i-input v-model="departmentData.remark" type="textarea" placeholder="请输入">
                            </i-input>
                        </i-form-item>
                    </i-form>
                </inner-card>
            </i-tab-pane>
            <i-tab-pane label="操作权限" name="operateRightsTab">
                <!-- 操作权限 -->
                <inner-card title="配置操作权限">
                    <i-tree :data="orgAuthorizeGroupTree" show-checkbox></i-tree>
                </inner-card>
            </i-tab-pane>
            <i-tab-pane label="数据权限" name="dataRightsTab">
                <!-- 数据权限 -->
                <inner-card title="配置数据权限">
                    <i-row gutter="24">
                        <i-col :sm="10" :xs="24">
                            <inner-tree title="权限目录" :data="orgDataAuthorityTree"></inner-tree>
                        </i-col>
                        <i-col :sm="14" :xs="24">
                            <inner-tree title="权限分配" :data="orgRightsDataTree" show-checkbox></inner-tree>
                        </i-col>
                    </i-row>
                </inner-card>
            </i-tab-pane>
            <i-tab-pane label="部门人员" name="userPreviewTab">
                <!-- 部门人员预览 -->
                <inner-card title="部门人员预览">
                    <i-table stripe :columns="userCols" :data="getOrdUsers()" :border="true"></i-table>
                    <div class="pagination-wrapper">
                        <div class="pagination">
                            <i-page :total="20" :current="1" @on-change="changePage"></i-page>
                        </div>
                    </div>
                </inner-card>
            </i-tab-pane>
            <i-tab-pane label="部门领导" name="leaderPreviewTab">
                <!-- 部门领导预览 -->
                <inner-card title="部门领导预览">
                    <!-- 操作按钮 -->
                    <div class="actionBlock">
                        <i-input placeholder="用户名查询" style="width: auto">
                            <i-icon type="ios-search" slot="suffix" class="searchBtn" />
                        </i-input>
                        <i-button @click="showLeaderModal = true">新增</i-button>
                        <i-button>删除</i-button>
                    </div>
                    <i-table stripe :columns="leaderCols" :data="orgLeaders" :border="true" :loading="isLeaderListLoading"></i-table>
                    <div class="pagination-wrapper">
                        <div class="pagination">
                            <i-page :total="100" :current="1" @on-change="changePage"></i-page>
                        </div>
                    </div>
                </inner-card>
                <!-- 模态框 -->
                <i-modal v-model="showLeaderModal" title="新增领导" class="leaderModal">
                    <i-form :model="setLeaderForm" :label-width="160">
                        <i-form-item label="领导类型">
                            <i-select v-model="setLeaderForm.leaderType">
                                <i-option value="beijing">总经理</i-option>
                                <i-option value="shanghai">副总经理</i-option>
                                <i-option value="shenzhen">经理</i-option>
                                <i-option value="shenzhen">副经理</i-option>
                                <i-option value="shenzhen">秘书</i-option>
                                <i-option value="shenzhen">报销员</i-option>
                            </i-select>
                        </i-form-item>
                        <i-form-item label="用户名、首字母或账号">
                            <i-input v-model="setLeaderForm.searchText" :search="true" :enter-button="true" />
                        </i-form-item>
                    </i-form>
                    <i-table stripe :columns="leaderCols" :data="orgLeaders" :border="true" :loading="isLeaderListLoading"></i-table>
                    <div class="pagination-wrapper">
                        <div class="pagination">
                            <i-page :total="100" :current="1" @on-change="changePage"></i-page>
                        </div>
                    </div>
                </i-modal>
            </i-tab-pane>
        </i-tabs>
    </i-card>
</template>

<script>
import {organization} from 'API'
import {replaceArrLabel} from 'UTIL/assist'
import {isFax} from 'UTIL/validate'
import InnerCard from 'WIDGET/inner/InnerCard'
import InnerTree from 'WIDGET/inner/InnerTree'

export default {
    name: 'org-department',
    props: {
        newUser: Boolean,
        activeTab: String,
        departmentData: Object
    },
    data () {
        const validateFax = (rule, value, callback) => {
            if (!value) {
                callback()
            } else if (!isFax(value)) {
                callback(new Error('格式不正确：(区号-)电话号码'))
            } else {
                callback()
            }
        }
        return {
            isSaveBtnLoading: false,
            isLeaderListLoading: false,
            orgAuthorizeGroupTree: [],
            orgDataAuthorityTree: [],
            orgRightsDataTree: [],
            orgUsers: [],
            orgLeaders: [],
            userCols: [
                {
                    title: '用户名',
                    key: 'userName'
                },
                {
                    title: '登录账号',
                    key: 'loginName'
                },
                {
                    title: '性别',
                    key: 'gender'
                },
                {
                    title: '用户类型',
                    key: 'userType'
                },
                {
                    title: '办公电话',
                    key: 'officePhone'
                },
                {
                    title: '移动电话',
                    key: 'mobilePhone'
                },
                {
                    title: '邮箱',
                    key: 'email'
                }
            ],
            leaderCols: [
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
                    title: '领导类型',
                    key: 'leaderType'
                }
            ],
            showLeaderModal: false,
            setLeaderForm: {
                leaderType: '',
                searchText: ''
            },
            ruleValidate: {
                orgName: [{required: true, message: '必填项', trigger: 'blur'}],
                typeId: [{required: true, message: '必填项', trigger: 'blur'}],
                isOA: [{required: true, message: '必填项', trigger: 'change'}],
                phone: [
                    {required: true, message: '必填项', trigger: 'blur'},
                    { validator: validateFax, trigger: 'blur' }
                ],
                fax: [{ validator: validateFax, trigger: 'blur' }],
                email: [
                    {required: true, message: '必填项', trigger: 'blur'},
                    {type: 'email', message: '格式不正确：登录名@主机名.域名', trigger: 'blur'}
                ],
                remark: [{max: 200, message: '格式错误：长度不应超出200', trigger: 'blur'}]
            }
        }
    },
    components: {
        InnerCard,
        InnerTree
    },
    methods: {
        changeTab (name) {
            this.$parent.activeTab = name
            switch (name) {
                case 'operateRightsTab':
                    this.getAuthorizeGroupTree()
                    break
                case 'dataRightsTab':
                    this.getDataAuthorityTree()
                    this.getRightsDataTree()
                    break
                case 'leaderPreviewTab':
                    this.getOrgLeaders()
            }
        },
        // 获取分配权限组树结构
        getAuthorizeGroupTree () {
            organization.getAuthorizeGroupTree({}).then(res => {
                replaceArrLabel(res.data, 'name', 'title')
                this.orgAuthorizeGroupTree = res.data
            }).catch(err => {
                this.$Message.error(err.message)
            })
        },
        // 获取数据权限目录
        getDataAuthorityTree () {
            organization.getDataAuthorityTree({}).then(res => {
                replaceArrLabel(res.data, 'name', 'title')
                this.orgDataAuthorityTree = res.data
            }).catch(err => {
                this.$Message.error(err.message)
            })
        },
        // 获取数据权限树结构
        getRightsDataTree () {
            organization.getRightsDataTree({}).then(res => {
                replaceArrLabel(res.data, 'name', 'title')
                this.orgRightsDataTree = res.data
            }).catch(err => {
                this.$Message.error(err.message)
            })
        },
        // 获取部门人员列表
        getOrdUsers () {
            return this.$store.state.bds.orgUsers
        },
        // 获取部门领导列表
        getOrgLeaders () {
            this.isLeaderListLoading = true
            organization.getOrgLeaders({}).then(res => {
                replaceArrLabel(res.data.rows, 'name', 'title')
                this.orgLeaders = res.data.rows
                this.isLeaderListLoading = false
            }).catch(err => {
                this.isLeaderListLoading = false
                this.$Message.error(err.message)
            })
        },
        changePage () {
            this.orgLeaders = this.getOrgLeaders()
        },
        // 保存修改
        handleSave () {
            this.isSaveBtnLoading = true
            // baseInfoTab内容检查
            this.$refs['departmentData'].validate((valid) => {
                if (!valid) {
                    this.$parent.activeTab = 'baseInfoTab'
                    this.$Message.error('信息填写有误，请检查')
                    return
                }
                this.$Message.success('保存成功')
            })
            // 模拟执行提交接口
            setTimeout(() => {
                this.isSaveBtnLoading = false
            }, 2000)
        }
    }
}
</script>

<style scoped lang="less" src="STYLE/view/systemConf/systemConf.less">
</style>
<style scoped lang="less" src="STYLE/view/systemConf/organization.less">
</style>

<style>
.leaderModal .ivu-modal {
  width: 800px !important;
}
</style>
