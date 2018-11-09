<template>
    <div>
        <i-card title="菜单模块管理" icon="ios-cog">
            <inner-card title="编辑区域">
                <div class="actionBlock">
                    <i-input placeholder="用户名查询" style="width: auto">
                        <i-icon type="ios-search" slot="suffix" class="searchBtn" />
                    </i-input>
                    <i-button @click="clickAddBtn" type="primary">新增</i-button>
                    <!-- <i-button @click="showEditModal = true;">编辑</i-button> -->
                    <!-- <i-button>删除</i-button> -->
                </div>
                <i-table stripe :columns="menuModuleCols" :data="menuModuleData" :border="true" :loading="isListLoading"></i-table>
                <div class="pagination-wrapper">
                    <div class="pagination">
                        <i-page :total="100" :current="1" @on-change="changePage"></i-page>
                    </div>
                </div>
            </inner-card>
        </i-card>
        <!-- 新增、编辑模态框 -->
        <i-modal v-model="showEditModal">
            <div slot="header">
                {{isAddModule?'新增模块':'编辑模块'}}
            </div>
            <i-form :model="moduleData" :label-width="80">
                <i-form-item label="编码">
                    <i-input v-model="moduleData.code" placeholder="请输入" />
                </i-form-item>
                <i-form-item label="模块名称">
                    <i-input v-model="moduleData.moduleName" placeholder="请输入" />
                </i-form-item>
                <i-form-item label="域">
                    <i-input v-model="moduleData.url" placeholder="请输入" />
                </i-form-item>
                <i-form-item label="备注">
                    <i-input v-model="moduleData.remark" type="textarea" placeholder="请输入" />
                </i-form-item>
            </i-form>
        </i-modal>

    </div>
</template>

<script>
import {menuModule} from 'API'
import InnerCard from 'WIDGET/inner/InnerCard'
export default {
    data () {
        return {
            value: [],
            menuModuleCols: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '编码',
                    key: 'code'
                },
                {
                    title: '模块',
                    key: 'moduleName'
                },
                {
                    title: '域',
                    key: 'url'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.showEditModal = true
                                        this.isAddModule = false
                                        this.moduleData = params.row
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'default',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        // this.handleDel(params.index)
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            menuModuleData: [],
            showEditModal: false,
            isListLoading: false,
            isAddModule: true,
            moduleData: {}
        }
    },
    components: {
        InnerCard
    },
    methods: {
        // 获取列表数据
        getMenuModuleData () {
            this.isListLoading = true
            menuModule.getMenuModuleData({}).then(res => {
                this.menuModuleData = res.data.rows
                this.isListLoading = false
            }).catch(err => {
                this.isListLoading = false
                this.$Message.error(err.message)
            })
        },
        // 点击编辑按钮
        clickAddBtn () {
            this.showEditModal = true
            this.isAddModule = true
            this.moduleData = {}
        },
        changePage () {

        }
    },
    created () {
        this.getMenuModuleData()
    }
}
</script>

<style>
</style>
