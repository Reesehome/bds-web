<template>
    <system-conf id="operatePermission">
        <!-- 菜单目录 -->
        <system-aside slot="systemAside" title="操作权限组列表" show-checkbox :asideTree="operateRightsGroupTree">
            <div slot="actionBlock">
                <i-button type="default" shape="circle" icon="md-add"></i-button>
                <i-button type="default" shape="circle" icon="md-trash"></i-button>
            </div>
        </system-aside>
        <!-- 编辑区 -->
        <i-card slot="systemEditor" title="操作权限-编辑区" icon="ios-cog">
            <i-button slot="extra" type="primary">保存</i-button>
            <i-tabs size="small" type="card" :value="activeTab">
                <!-- 基本信息 -->
                <i-tab-pane label="基本信息" name="baseInfoTab">
                    <inner-card title="修改基本信息">
                        <i-form :label-width="100">
                            <i-form-item label="名称">
                                <i-input type="text" />
                            </i-form-item>
                            <i-form-item label="描述">
                                <i-input type="textarea" />
                            </i-form-item>
                        </i-form>
                    </inner-card>
                </i-tab-pane>
                <!-- 包含的权限 -->
                <i-tab-pane label="包含的权限" name="constituteTab">
                    <inner-card title="修改权限">
                        <i-tree :data="operateRightsTree" show-checkbox></i-tree>
                    </inner-card>
                </i-tab-pane>
                <!-- 部门授权 -->
                <i-tab-pane label="部门授权" name="AuthorizeTab">
                    <inner-card title="分配操作权限">
                        <i-tree :data="departmentTree" show-checkbox></i-tree>
                    </inner-card>
                </i-tab-pane>
                <!-- 已授权的部门 -->
                <i-tab-pane label="已授权的部门" name="departmentPrviewTab">
                    <inner-card title="预览所有已授权的部门">
                        <div class="actionBlock">
                            <i-input search placeholder="请输入名称或首字母" style="width:auto" />
                            <i-button>重置</i-button>
                        </div>
                        <i-table stripe :columns="specificDepartmentCols" :data="specificDepartment" :border="true" :highlight-row="true"></i-table>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <i-page :total="10" :current="1"></i-page>
                            </div>
                        </div>
                    </inner-card>
                </i-tab-pane>
                <!-- 已授权的用户 -->
                <i-tab-pane label="已授权的用户" name="userPreviewTab">
                    <inner-card title="预览所有已授权的用户">
                        <div class="actionBlock">
                            <i-input search placeholder="请输入用户名、用户名首字母或登录账号" style="width:50%" />
                            <i-button>重置</i-button>
                        </div>
                        <i-table stripe :columns="specificUserCols" :data="specificUser" :border="true" :highlight-row="true"></i-table>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <i-page :total="10" :current="1"></i-page>
                            </div>
                        </div>
                    </inner-card>
                </i-tab-pane>
            </i-tabs>
        </i-card>
    </system-conf>
</template>

<script>
import SystemConf from 'VIEW/layout/SystemConf'
import SystemAside from 'WIDGET/systemAside/SystemAside'
import InnerCard from 'WIDGET/inner/InnerCard'
import {organization, operateRights} from 'API'
import {replaceArrLabel} from 'UTIL/assist'

export default {
    data () {
        return {
            activeTab: '',
            operateRightsGroupTree: [],
            operateRightsTree: [],
            departmentTree: [],
            specificDepartment: [],
            specificUser: [],
            specificDepartmentCols: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '部门名称',
                    key: 'orgName'
                },
                {
                    title: '上级部门',
                    key: 'parentName'
                }
            ],
            specificUserCols: [
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
                },
                {
                    title: '所属部门',
                    key: 'department'

                }]
        }
    },
    components: {
        SystemConf,
        SystemAside,
        InnerCard
    },
    methods: {
        // 获取操作权限组树结构
        getOperateRightsGroupTree () {
            organization.getAuthorizeGroupTree({}).then(res => {
                replaceArrLabel(res.data, 'name', 'title')
                this.operateRightsGroupTree = res.data
            }).catch(err => {
                this.$Message.error(err.message)
            })
        },
        // 递归获得父子层级
        pushIntoParent (arr, item) {
            const parentId = item.parentId
            const arrLength = arr.length
            for (let i = 0; i < arrLength; i++) {
                if (parentId === arr[i].id) {
                    if (!arr[i].children) {
                        arr[i].children = [].concat(item)
                        return
                    }
                    arr[i].children.push(item)
                    return
                }
                // 逐层检查
                if (arr[i].children) this.pushIntoParent(arr[i].children, item)
            }
        },
        // 获取操作权限树结构
        getOperateRightsTree () {
            operateRights.getOperateRightsTree({}).then(res => {
                let tree = res.data
                const treeLen = tree.length
                let arr = []
                for (let i = 0; i < treeLen; i++) {
                    if (!tree[i].parentId) {
                        arr.push(tree[i])
                    } else {
                        this.pushIntoParent(arr, tree[i])
                    }
                }
                replaceArrLabel(arr, 'name', 'title')
                this.operateRightsTree = arr
            }).catch(err => {
                this.$Message.error(err.message)
            })
        },
        // 获取操作权限树结构
        getDepartmentTree () {
            operateRights.getDepartmentTree({}).then(res => {
                let tree = res.data
                replaceArrLabel(tree, 'name', 'title')
                this.departmentTree = tree
            }).catch(err => {
                this.$Message.error(err.message)
            })
        },
        // 获取已授权的部门
        getSpecificDepartment () {
            operateRights.getSpecificDepartment({}).then(res => {
                replaceArrLabel(res.data.rows, 'name', 'title')
                this.specificDepartment = res.data.rows
            }).catch(err => {
                this.$Message.error(err.message)
            })
        },
        // 获取已授权的用户
        getSpecificUser () {
            operateRights.getSpecificUser({}).then(res => {
                replaceArrLabel(res.data.rows, 'name', 'title')
                this.specificUser = res.data.rows
            }).catch(err => {
                this.$Message.error(err.message)
            })
        },
        getSelectedNode () {

        }
    },
    mounted () {
        this.getOperateRightsGroupTree()
        this.getOperateRightsTree()
        this.getDepartmentTree()
        this.getSpecificDepartment()
        this.getSpecificUser()
    }
}
</script>

<style scoped lang="less" src="STYLE/view/systemConf/systemConf.less">
</style>
