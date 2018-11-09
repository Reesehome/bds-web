<template>
    <system-conf id="menuSettings">
        <!-- 菜单目录 -->
        <system-aside slot="systemAside" title="菜单目录" :asideTree="menuTree"></system-aside>
        <!-- 属性编辑区 -->
        <i-card slot="systemEditor" title="属性编辑" icon="ios-cog">
            <i-button type="primary" slot="extra">保存</i-button>
            <!-- 基本属性 -->
            <inner-card title="基本属性">
                <i-form :label-width="80">
                    <i-form-item label="上级名称">
                        <i-input v-model="value" disabled></i-input>
                    </i-form-item>
                    <i-form-item label="名称翻译">
                        <i-table stripe :columns="nameLabels" :data="nameValues"></i-table>
                    </i-form-item>
                    <i-form-item label="图标名">
                        <i-input v-model="value" placeholder="Password">
                            <i-icon type="ios-lock-outline" slot="prepend"></i-icon>
                            <Button type="text" @click="isChooseIcon = true" slot="append">选择</Button>
                        </i-input>
                        <!-- 选择图标模态框 -->
                        <i-modal v-model="isChooseIcon" title="选择图标">
                            <i-tabs type="card">
                                <i-tab-pane label="Simple Line">标签一的内容</i-tab-pane>
                                <i-tab-pane label="Fontawesome">标签二的内容</i-tab-pane>
                                <i-tab-pane label="Glyphicons">标签三的内容</i-tab-pane>
                            </i-tabs>
                        </i-modal>
                    </i-form-item>
                    <i-form-item label="描述">
                        <i-input v-model="value" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></i-input>
                    </i-form-item>
                </i-form>
            </inner-card>
            <!-- 属性 -->
            <inner-card title="属性">
                <i-form :label-width="100">
                    <i-row>
                        <i-col span="12">
                            <i-form-item label="显示为菜单">
                                <i-switch>
                                    <span slot="open">是</span>
                                    <span slot="close">否</span>
                                </i-switch>
                            </i-form-item>
                        </i-col>
                        <i-col span="12">
                            <i-form-item label="显示方式">
                                <i-radio-group v-model="showType" size="large">
                                    <i-radio label="主工作区"></i-radio>
                                    <i-radio label="新窗口"></i-radio>
                                </i-radio-group>
                            </i-form-item>
                        </i-col>
                    </i-row>
                    <i-form-item label="http请求方式">
                        <i-select v-model="httpReqMethod" style="width:200px">
                            <i-option value="GET" label="GET"></i-option>
                            <i-option value="POST" label="POST"></i-option>
                        </i-select>
                    </i-form-item>
                    <i-form-item label="http请求URL">
                        <i-input v-model="httpModule" placeholder="请输入请求URL" type="text">
                            <i-button @click="isChooseHttpModule = true" slot="append">选择</i-button>
                        </i-input>
                        <i-modal v-model="isChooseHttpModule" title="选择模块">
                            <i-select v-model="httpModule">
                                <i-option value="嘿嘿" label="嘿嘿"></i-option>
                                <i-option value="哈哈哈" label="哈哈哈"></i-option>
                            </i-select>
                        </i-modal>
                    </i-form-item>
                    <i-form-item label="菜单过滤器">
                        <i-input v-model="value" type="text" placeholder="啥来的。。。。。"></i-input>
                    </i-form-item>

                </i-form>
            </inner-card>
            <!-- 权限属性 -->
            <inner-card title="权限属性">
                <i-form :label-width="140">
                    <i-row>
                        <i-col span="12">
                            <i-form-item label="是否进行权限控制">
                                <i-switch>
                                    <span slot="open">是</span>
                                    <span slot="close">否</span>
                                </i-switch>
                            </i-form-item>
                        </i-col>
                        <i-col span="12">
                            <i-form-item label="权限编号">
                                <i-input v-model="value"></i-input>
                            </i-form-item>
                        </i-col>
                    </i-row>
                </i-form>
            </inner-card>
        </i-card>
    </system-conf>
</template>

<script>
import SystemConf from 'VIEW/layout/SystemConf'
import SystemAside from 'WIDGET/systemAside/SystemAside'
import InnerCard from 'WIDGET/inner/InnerCard'
export default {
    data () {
        return {
            value: '',
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
                    nameValue: 'System management'
                },
                {
                    nameLabel: '中文简体',
                    nameCode: 'zh_CN',
                    nameValue: '系统管理'
                }
            ],
            isChooseIcon: false,
            isChooseHttpModule: false,
            menuTree: [
                {
                    title: '工作流',
                    expand: true,
                    children: [
                        {
                            title: '流程设计',
                            expand: true,
                            children: [
                                {
                                    title: '流程定义',
                                    expand: true
                                },
                                {
                                    title: '流程分类管理',
                                    expand: true
                                },
                                {
                                    title: '可发起流程配置',
                                    expand: true
                                }
                            ]
                        },
                        {
                            title: '流程执行',
                            expand: true,
                            children: [
                                {
                                    title: '流程执行child',
                                    expand: true
                                },
                                {
                                    title: '流程执行child',
                                    expand: true
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '工作流',
                    expand: true,
                    children: [
                        {
                            title: '流程设计',
                            expand: true,
                            children: [
                                {
                                    title: '流程定义',
                                    expand: true
                                },
                                {
                                    title: '流程分类管理',
                                    expand: true
                                },
                                {
                                    title: '可发起流程配置',
                                    expand: true
                                }
                            ]
                        },
                        {
                            title: '流程执行',
                            expand: true,
                            children: [
                                {
                                    title: '流程执行child',
                                    expand: true
                                },
                                {
                                    title: '流程执行child',
                                    expand: true
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '工作流',
                    expand: true,
                    children: [
                        {
                            title: '流程设计',
                            expand: true,
                            children: [
                                {
                                    title: '流程定义',
                                    expand: true
                                },
                                {
                                    title: '流程分类管理',
                                    expand: true
                                },
                                {
                                    title: '可发起流程配置',
                                    expand: true
                                }
                            ]
                        },
                        {
                            title: '流程执行',
                            expand: true,
                            children: [
                                {
                                    title: '流程执行child',
                                    expand: true
                                },
                                {
                                    title: '流程执行child',
                                    expand: true
                                }
                            ]
                        }
                    ]
                }],
            showType: '主工作区',
            httpReqMethod: 'GET',
            httpModule: ''
        }
    },
    methods: {
        initMenuTree () {},
        selectMenuItem () {},
        saveMenuSettings () {}
    },
    components: {
        SystemConf,
        SystemAside,
        InnerCard
    },
    created () {
        this.initMenuTree()
    }
}
</script>

<style scoped lang="less" src="STYLE/view/systemConf/systemConf.less">
</style>
