<template>
    <system-conf id="dictionary">
        <!-- 菜单目录 -->
        <system-aside slot="systemAside" title="字典目录" :asideTree="dictionaryTree" @sendTreeNode="getSelectedNode"></system-aside>
        <!-- 编辑区 -->
        <i-card slot="systemEditor" title="字典定义" icon="ios-cog">
            <i-button slot="extra" type="primary">保存</i-button>
            <!-- 基本信息 -->
            <inner-card title="基本信息">
                <i-form :label-width="100">
                    <i-form-item label="分类">
                        <i-input :value="dictionaryData.name" v-show="dictionaryData.type==='C'"></i-input>
                        <i-input :value="dictionaryData.parentName" v-show="dictionaryData.type!=='C'"></i-input>
                    </i-form-item>
                    <i-form-item label="名称" v-show="dictionaryData.type!=='C'">
                        <i-input :value="dictionaryData.name"></i-input>
                    </i-form-item>
                    <i-form-item label="编码" v-show="dictionaryData.type!=='C'">
                        <i-input :value="dictionaryData.id"></i-input>
                    </i-form-item>
                    <i-form-item label="描述">
                        <i-input type="textarea" :value="dictionaryData.remark"></i-input>
                    </i-form-item>
                </i-form>
            </inner-card>
            <!-- 二级菜单：已有的扩展属性列表 -->
            <inner-card title="已有的扩展属性列表" v-show="dictionaryData.type==='D'">
                <!-- 功能按钮区 -->
                <div class="actionBlock">
                    <i-button @click="handleAddExForm">新增</i-button>
                    <i-button @click="handleEditExForm">编辑</i-button>
                    <i-button>删除</i-button>
                </div>
                <!-- 列表 -->
                <i-table stripe :columns="exFormCols" :data="exForm" :border="true" @on-selection-change="selectExForm" :loading="isExFormLoading"></i-table>
                <!-- 分页 -->
                <div class="pagination-wrapper">
                    <div class="pagination">
                        <i-page :total="10" :current="1"></i-page>
                    </div>
                </div>
                <!-- 新增、编辑模态框 -->
                <i-modal v-model="isShowExDataModal" :title="`${modalTypeConst[modalType]}扩展属性`">
                    <i-form v-model="exFormItem" :label-width="100">
                        <!-- 基本属性编辑区 -->
                        <i-form-item label="名称">
                            <i-input :value="exFormItem.name" placeholder="请输入"></i-input>
                        </i-form-item>
                        <i-form-item label="配置方式">
                            <i-select v-model="exFormItem.exSource">
                                <i-option value="literal" label="文本框"></i-option>
                                <i-option value="list" label="下拉菜单"></i-option>
                                <i-option value="radio" label="单选"></i-option>
                                <i-option value="checkbox" label="复选框"></i-option>
                            </i-select>
                        </i-form-item>
                        <!-- 选项编辑区（当配置方式为下拉菜单、单选、复选框才显示） -->
                        <div v-show="exFormItem.exSource==='list'||exFormItem.exSource==='radio'||exFormItem.exSource==='checkbox'">
                            <!-- 选项填写 -->
                            <i-form-item :label="`选项${i+1}`" v-for="(o, i) in exFormItem.exData.options" :key="i">
                                <i-row>
                                    <i-col span="19">
                                        <i-input type="text" placeholder="请输入选项值" :value="o.value"></i-input>
                                    </i-col>
                                    <i-col span="4" offset="1">
                                        <i-button @click="handleRemoveOption(i)">删除</i-button>
                                    </i-col>
                                </i-row>
                            </i-form-item>
                            <!-- 新增选项按钮 -->
                            <i-form-item>
                                <i-row>
                                    <i-col span="19">
                                        <i-button type="dashed" long icon="md-add" @click="handleAddOption">新增选项</i-button>
                                    </i-col>
                                </i-row>
                            </i-form-item>
                        </div>
                    </i-form>
                </i-modal>
            </inner-card>
            <!-- 三级菜单：多语言设置 -->
            <inner-card title="多语言设置" v-show="dictionaryData.type==='I'">
                <i-table stripe :columns="nameLabels" :data="nameValues"></i-table>
            </inner-card>
            <!-- 三级菜单：扩展属性配置 -->
            <inner-card title="扩展属性配置" v-show="dictionaryData.type==='I'">
                <i-form :label-width="100">
                    <i-form-item v-for="item in exForm" :key="item.id" :label="item.name">
                        <i-input :value="item.value" v-show="item.exSource === 'literal'" />
                        <i-select v-model="item.value" v-show="item.exSource === 'list'" placement="top-start">
                            <i-option v-for="(o, i) in item.exData.options" :label="o.value" :value="o.value" :key="i"></i-option>
                        </i-select>
                        <i-radio-group v-model="item.value" v-show="item.exSource === 'radio'">
                            <i-radio v-for="(o, i) in item.exData.options" :key="i" :label="o.value"></i-radio>
                        </i-radio-group>
                    </i-form-item>
                </i-form>
            </inner-card>
        </i-card>
    </system-conf>
</template>

<script>
import SystemConf from 'VIEW/layout/SystemConf'
import SystemAside from 'WIDGET/systemAside/SystemAside'
import InnerCard from 'WIDGET/inner/InnerCard'
import {dictionary} from 'API'
import {replaceArrLabel} from 'UTIL/assist'
export default {
    data () {
        return {
            dictionaryTree: [],
            dictionaryData: [],
            nameLabels: [
                {
                    key: 'nameLabel',
                    title: '语言类型'
                },
                {
                    key: 'nameCode',
                    title: '语言编码'
                },
                {
                    key: 'nameValue',
                    title: '翻译值',
                    render: (h, params) => {
                        return h('div', [
                            h('Input', {
                                style: {
                                    marginRight: '5px'
                                }
                            })
                        ])
                    }
                }
            ],
            nameValues: [
                {
                    nameLabel: 'USA',
                    nameCode: 'en_US',
                    nameValue: ''
                },
                {
                    nameLabel: '中文简体',
                    nameCode: 'zh_CN',
                    nameValue: ''
                }
            ],
            exFormCols: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    key: 'name',
                    title: '字段'
                },
                {
                    key: 'exSourceName',
                    title: '配置方式'
                }
            ],
            exSourceConst: {
                'literal': '文本输入',
                'radio': '单选',
                'list': '下拉菜单'
            },
            exForm: [],
            exFormItem: {
                name: '',
                exSource: '',
                exData: {
                    options: [{}]
                }
            },
            exFormSelection: [],
            modalType: '',
            modalTypeConst: {
                'add': '新增',
                'edit': '修改'
            },
            isExFormLoading: false,
            isShowExDataModal: false
        }
    },
    components: {
        SystemConf,
        SystemAside,
        InnerCard
    },
    methods: {
        // 获取字典值目录
        getDictionaryTree () {
            dictionary.getDictionaryTree({}).then(res => {
                let tree = res.data
                replaceArrLabel(tree, 'name', 'title')
                this.dictionaryTree = tree
            }).catch(err => {
                this.$Message.error(err.message)
            })
        },
        // 获取字典值详情
        getExtentList () {
            this.isExFormLoading = true
            dictionary.getExtentList({}).then(res => {
                let list = res.data.rows
                const listLen = list.length
                for (let i = 0; i < listLen; i++) {
                    // 修改数据格式
                    if (list[i].exData.source.exSource) {
                        list[i].exSourceName = this.exSourceConst[list[i].exData.source.exSource]
                        list[i].exSource = list[i].exData.source.exSource
                    }
                }
                this.exForm = list
                this.isExFormLoading = false
            }).catch(err => {
                this.isExFormLoading = false
                this.$Message.error(err.message)
            })
        },
        // 获取树结构已选择的某一节点
        getSelectedNode (data) {
            this.dictionaryData = data
            this.getExtentList()
        },
        // 增加扩展属性模态框选项
        handleAddOption () {
            this.exFormItem.exData.options.push({})
        },
        // 删除扩展属性模态框某一选项
        handleRemoveOption (index) {
            this.exFormItem.exData.options.splice(index, 1)
        },
        // 新增扩展属性表单数据
        handleAddExForm () {
            this.exFormItem = {
                name: '',
                exSource: '',
                exData: {
                    options: [{}]
                }
            }
            this.modalType = 'add'
            this.isShowExDataModal = true
        },
        // 勾选/反选扩展属性列表
        selectExForm (selection) {
            this.exFormSelection = selection
        },
        // 编辑扩展属性列表数据
        handleEditExForm () {
            const selectedExDataLength = this.exFormSelection.length
            if (!selectedExDataLength) {
                this.$Message.warning('请先勾选')
                return
            }
            if (selectedExDataLength !== 1) {
                this.$Message.warning('请单选')
                return
            }
            this.modalType = 'edit'
            this.exFormItem = this.exFormSelection[0]
            this.isShowExDataModal = true
        }
    },
    mounted () {
        this.getDictionaryTree()
    }
}
</script>

<style scoped lang="less" src="STYLE/view/systemConf/systemConf.less">
</style>
