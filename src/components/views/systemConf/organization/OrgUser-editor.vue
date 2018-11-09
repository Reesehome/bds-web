<template>
    <!-- 用户编辑及授权 -->
    <i-card title="用户编辑及授权" icon="ios-cog">
        <i-button type="primary" slot="extra" @click="handleSave" :loading="isSaveBtnLoading">保存</i-button>
        <i-tabs size="small" type="card" :value="activeTab" @on-click="changeTab">
            <i-tab-pane label="基本信息" name="baseInfoTab">
                <!-- 基本信息 -->
                <inner-card :title="{'新增基本属性':newUser,'修改基本属性':!newUser}">
                    <i-form ref="userData" :model="userData" :rules="ruleValidate" :label-width="160">
                        <i-row>
                            <i-col span="12">
                                <i-form-item label="用户名" prop="userName">
                                    <i-input v-model="userData.userName" placeholder="请输入"></i-input>
                                </i-form-item>
                            </i-col>
                            <i-col span="12">
                                <i-form-item label="登录账号" prop="loginName">
                                    <i-input v-model="userData.loginName" placeholder="请输入"></i-input>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col span="12">
                                <i-form-item label="用户类型" prop="userType">
                                    <i-select v-model="userData.userType">
                                        <i-option value="F">正式工</i-option>
                                        <i-option value="T">临时工</i-option>
                                        <i-option value="S">代维人员</i-option>
                                        <i-option value="M">供货商</i-option>
                                        <i-option value="Trainee">实习生</i-option>
                                    </i-select>
                                </i-form-item>
                            </i-col>
                            <i-col span="12">
                                <i-form-item label="性别" prop="gender">
                                    <i-radio-group v-model="userData.gender">
                                        <i-radio label="M">
                                            <span>男</span>
                                        </i-radio>
                                        <i-radio label="F">
                                            <span>女</span>
                                        </i-radio>
                                    </i-radio-group>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col span="12">
                                <i-form-item label="入职日期" prop="employDate">
                                    <i-date-picker type="date" v-model="userData.employDate" placeholder="请选择" :editable="false" format="yyyy-MM-dd" :options="dateOptions" @on-change="selectDate(arguments,'employDate')"></i-date-picker>
                                </i-form-item>
                            </i-col>
                            <i-col span="12">
                                <i-form-item label="账号失效日期" prop="expiredDate">
                                    <i-date-picker type="date" v-model="userData.expiredDate" placeholder="请选择" :editable="false" format="yyyy-MM-dd" @on-change="selectDate(arguments,'expiredDate')"></i-date-picker>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col span="12">
                                <i-form-item label="办公电话" prop="officePhone">
                                    <i-input v-model="userData.officePhone" placeholder="请输入"></i-input>
                                </i-form-item>
                            </i-col>
                            <i-col span="12">
                                <i-form-item label="住宅电话" prop="homePhone">
                                    <i-input v-model="userData.homePhone" placeholder="请输入"></i-input>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col span="12">
                                <i-form-item label="移动电话" prop="mobilePhone">
                                    <i-input v-model="userData.mobilePhone" placeholder="请输入"></i-input>
                                </i-form-item>
                            </i-col>
                            <i-col span="12">
                                <i-form-item label="传真" prop="fax">
                                    <i-input v-model="userData.fax" placeholder="请输入"></i-input>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col span="12">
                                <i-form-item label="邮件" prop="email">
                                    <i-input v-model="userData.email" type="email" placeholder="请输入"></i-input>
                                </i-form-item>
                            </i-col>
                            <i-col span="12">
                                <i-form-item label="允许接受即时信息" prop="duty">
                                    <i-radio-group v-model="userData.duty">
                                        <i-radio label="Y">
                                            <span>是</span>
                                        </i-radio>
                                        <i-radio label="N">
                                            <span>否</span>
                                        </i-radio>
                                    </i-radio-group>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col span="12">
                                <i-form-item label="允许重复登录" prop="isLimitMultiLogin">
                                    <i-radio-group v-model="userData.isLimitMultiLogin">
                                        <i-radio label="Y">
                                            <span>是</span>
                                        </i-radio>
                                        <i-radio label="N">
                                            <span>否</span>
                                        </i-radio>
                                    </i-radio-group>
                                </i-form-item>
                            </i-col>
                            <i-col span="12">
                                <i-form-item label="允许外系统登录账号" prop="isVirtual">
                                    <i-radio-group v-model="userData.isVirtual">
                                        <i-radio label="Y">
                                            <span>是</span>
                                        </i-radio>
                                        <i-radio label="N">
                                            <span>否</span>
                                        </i-radio>
                                    </i-radio-group>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col span="12">
                                <i-form-item label="账号是否可用" prop="isValid">
                                    <i-radio-group v-model="userData.isValid">
                                        <i-radio label="Y">
                                            <span>是</span>
                                        </i-radio>
                                        <i-radio label="N">
                                            <span>否</span>
                                        </i-radio>
                                    </i-radio-group>
                                </i-form-item>
                            </i-col>
                            <i-col span="12">
                                <i-form-item label="外系统登录账号" prop="userRdn">
                                    <i-input v-model="userData.userRdn" type="text" placeholder="请输入" />
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col span="24">
                                <i-form-item label="限定登录IP" prop="limitedIp">
                                    <i-input v-model="userData.limitedIp" type="text" placeholder="请输入" />
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col span="24">
                                <i-form-item label="备注" prop="remark">
                                    <i-input v-model="userData.remark" type="textarea" placeholder="请输入" />
                                </i-form-item>
                            </i-col>
                        </i-row>
                    </i-form>
                </inner-card>
            </i-tab-pane>
            <i-tab-pane label="所在部门" name="departmentTab">
                <!-- 所在部门 -->
                <inner-card :title="{'新增所在部门': newUser,'修改所在部门': !newUser}">
                    <i-tree :data="orgDepartmentTree" show-checkbox></i-tree>
                </inner-card>
            </i-tab-pane>
            <i-tab-pane label="操作权限" name="operateRightsTab">
                <!-- 操作权限 -->
                <inner-card title="配置操作权限">
                    <i-row gutter="24">
                        <i-col :sm="8" :xs="24">
                            <inner-tree title="已拥有的权限组" :data="orgOwnedGroupTree"></inner-tree>
                        </i-col>
                        <i-col :sm="8" :xs="24">
                            <inner-tree title="分配权限组" :data="orgAuthorizeGroupTree" show-checkbox></inner-tree>
                        </i-col>
                        <i-col :sm="8" :xs="24">
                            <inner-tree title="分配单独权限" :data="orgMenuRightsByUser" show-checkbox></inner-tree>
                        </i-col>
                    </i-row>
                </inner-card>
            </i-tab-pane>
            <i-tab-pane label="数据权限" :disabled="newUser" name="dataRightsTab">
                <!-- 数据权限 -->
                <inner-card title="配置数据权限">
                    <i-row gutter="24">
                        <i-col span="10">
                            <inner-tree title="权限目录" :data="orgDataAuthorityTree"></inner-tree>
                        </i-col>
                        <i-col span="14">
                            <inner-tree title="权限分配" :data="orgRightsDataTree" show-checkbox></inner-tree>
                        </i-col>
                    </i-row>
                </inner-card>
            </i-tab-pane>
            <i-tab-pane label="操作权限总览" :disabled="newUser" name="operatePreviewTab">
                <!-- 操作权限总览 -->
                <inner-card title="总览操作权限">
                    <div style="width:45%; padding-left:30px">
                        <i-tree :data="orgMenuRightsByUser"></i-tree>
                    </div>
                </inner-card>
            </i-tab-pane>
        </i-tabs>
    </i-card>
</template>

<script>
import {organization} from 'API'
import {replaceArrLabel} from 'UTIL/assist'
import {isNumber, isFax, isPhone, isIP} from 'UTIL/validate'
import InnerCard from 'WIDGET/inner/InnerCard'
import InnerTree from 'WIDGET/inner/InnerTree'

export default {
    name: 'org-user',
    props: {
        newUser: Boolean,
        activeTab: String,
        userData: Object
    },
    data () {
        // const validate_number = (rule, value, callback) => {
        //     if (!value) {
        //         callback()
        //     } else if (!validateNumber(value)) {
        //         callback(new Error('格式不正确：输入了非数字字符'))
        //     } else {
        //         callback()
        //     }
        // }
        const validateFax = (rule, value, callback) => {
            if (!value) {
                callback()
            } else if (!isFax(value)) {
                callback(new Error('格式不正确：(区号-)电话号码'))
            } else {
                callback()
            }
        }
        const validatePhone = (rule, value, callback) => {
            if (!isNumber(value)) {
                callback(new Error('格式不正确：输入了非数字字符'))
            } else if (!isPhone(value)) {
                callback(new Error('格式不正确：手机号码应以1开头'))
            } else {
                callback()
            }
        }
        const validateIp = (rule, value, callback) => {
            if (!value) {
                callback()
            } else if (!isIP(value)) {
                callback(new Error('格式不正确：IP地址格式不正确'))
            } else {
                callback()
            }
        }
        return {
            isSaveBtnLoading: false,
            dateOptions: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now()
                }
            },
            orgDepartmentTree: [],
            orgOwnedGroupTree: [],
            orgMenuRightsByUser: [],
            orgAuthorizeGroupTree: [],
            orgDataAuthorityTree: [],
            orgRightsDataTree: [],
            ruleValidate: {
                userName: [{required: true, message: '必填项', trigger: 'blur'}],
                loginName: [{required: true, message: '必填项', trigger: 'blur'}],
                userType: [{required: true, message: '必填项', trigger: 'blur'}],
                gender: [{required: true, message: '必填项', trigger: 'change'}],
                employDate: [{required: true, message: '必填项', trigger: 'blur'}],
                expiredDate: [{required: true, message: '必填项', trigger: 'blur'}],
                officePhone: [{ validator: validateFax, trigger: 'blur' }],
                homePhone: [{ validator: validateFax, trigger: 'blur' }],
                mobilePhone: [
                    {required: true, message: '必填项', trigger: 'blur'},
                    {len: 11, message: '格式错误：手机号码长度应为11位', trigger: 'blur'},
                    { validator: validatePhone, trigger: 'blur' }
                ],
                fax: [{ validator: validateFax, trigger: 'blur' }],
                email: [
                    {required: true, message: '必填项', trigger: 'blur'},
                    {type: 'email', message: '格式不正确：登录名@主机名.域名', trigger: 'blur'}
                ],
                duty: [{required: true, message: '必填项', trigger: 'change'}],
                isLimitMultiLogin: [{required: true, message: '必填项', trigger: 'change'}],
                isVirtual: [{required: true, message: '必填项', trigger: 'change'}],
                isValid: [{required: true, message: '必填项', trigger: 'change'}],
                limitedIp: [{validator: validateIp, trigger: 'blur'}],
                remark: [{max: 200, message: '格式错误：长度不应超出200', trigger: 'blur'}]
            }
        }
    },
    components: {
        InnerCard,
        InnerTree
    },
    methods: {
        // 切换tab页时才加载相应数据
        changeTab (name) {
            this.$parent.activeTab = name
            switch (name) {
                case 'departmentTab':
                    this.getDepartmentTree()
                    break
                case 'operateRightsTab':
                    this.getAuthorizeGroupTree()
                    this.getMenuRightsByUser()
                    break
                case 'dataRightsTab':
                    this.getDataAuthorityTree()
                    this.getRightsDataTree()
                    break
                case 'operatePreviewTab':
                    this.getMenuRightsByUser()
                    break
            }
        },
        // 获取已拥有的操作权限树结构
        getOwnedGroupTree () {
            organization.getOwnedGroupTree({}).then(res => {
                replaceArrLabel(res.data, 'name', 'title')
                this.orgOwnedGroupTree = res.data
            }).catch(err => {
                this.$Message.error(err.message)
            })
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
        // 获取单独操作权限树结构
        getMenuRightsByUser () {
            organization.getMenuRightsByUser({}).then(res => {
                replaceArrLabel(res.data, 'name', 'title')
                this.orgMenuRightsByUser = res.data
            }).catch(err => {
                this.$Message.error(err.message)
            })
        },
        // 增加属性
        addArrLabel (arr, item) {
            arr.forEach(i => {
                i.checked = false
                if (i.id === item.orgId) {
                    i.checked = true
                }
                if (i.children) {
                    this.addArrLabel(i.children, item)
                }
            })
            return arr
        },
        // 获取部门树结构
        getDepartmentTree () {
            let arr = this.$store.state.bds.orgDepartmentTree
            const departments = this.userData.departments
            if (departments) {
                departments.forEach(item => {
                    arr = this.addArrLabel(arr, item)
                })
            }
            this.orgDepartmentTree = arr
            // return arr
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
        // 检查层级结构里是否有勾选
        // checkedNode (arr, cb) {
        //     for (let i = 0; i < arr.length; i++) {
        //         if (arr[i].checked) {
        //             return true;
        //         }
        //         if (arr[i].children) {
        //             this.checkedNode(arr[i].children)
        //         }
        //     }
        //     return false
        // },
        // 保存日期修改
        selectDate (args, dataType) {
            const date = args[0]
            this.userData[dataType] = date
        },
        // 保存修改
        handleSave () {
            this.isSaveBtnLoading = true
            // baseInfoTab内容检查
            this.$refs['userData'].validate((valid) => {
                if (valid) {
                    this.$Message.success('保存成功')
                } else {
                    this.$parent.activeTab = 'baseInfoTab'
                    this.$Message.error('信息填写有误，请检查')
                }
            })
            // departmentTab内容检查
            // const cl = this.checkedNode(this.orgDepartmentTree)
            // console.log(cl)
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
</style>
