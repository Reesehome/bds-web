<template>
    <div id="dataRights" class="clearfix">
        <!-- 菜单目录 -->
        <aside class="systemConf-aside xs-w100">
            <i-card title="数据权限结构" icon="ios-cog">
                <i-tree :data="dataRightsTree" @on-select-change="selectNode"></i-tree>
            </i-card>
        </aside>
        <!-- 编辑区 -->
        <section class="systemConf-editor xs-w100">
            <i-card title="数据权限-编辑区" icon="ios-cog">
                <i-button slot="extra" type="primary">保存</i-button>
                <div class="inner-card">
                    <div class="card-head">修改基本信息</div>
                    <div class="card-body">
                        <i-form :label-width="100">
                            <i-row v-show="baseInfo.parent">
                                <i-col span="24">
                                    <i-form-item label="权限类型">
                                        <i-input type="text" :value="baseInfo.name"></i-input>
                                    </i-form-item>
                                </i-col>
                            </i-row>
                            <i-row v-show="!baseInfo.parent">
                                <i-col span="24">
                                    <i-form-item label="权限类型">
                                        <i-input type="text" :value="baseInfo.parentName"></i-input>
                                    </i-form-item>
                                </i-col>
                            </i-row>
                            <i-row v-show="!baseInfo.parent">
                                <i-col span="12">
                                    <i-form-item label="权限名称">
                                        <i-input type="text" :value="baseInfo.name"></i-input>
                                    </i-form-item>
                                </i-col>
                                <i-col span="12">
                                    <i-form-item label="权限编码">
                                        <i-input type="text" :value="baseInfo.id"></i-input>
                                    </i-form-item>
                                </i-col>
                            </i-row>
                            <i-row v-show="!baseInfo.parent">
                                <i-col span="24">
                                    <i-form-item label="是否启动">
                                        <i-switch v-model="baseInfo.isStart">
                                            <span slot="open">开</span>
                                            <span slot="close">关</span>
                                        </i-switch>
                                    </i-form-item>
                                </i-col>
                            </i-row>
                            <i-row>
                                <i-col span="24">
                                    <i-form-item label="描述">
                                        <i-input type="textarea" :value="baseInfo.remark" />
                                    </i-form-item>
                                </i-col>
                            </i-row>
                        </i-form>
                    </div>
                </div>
            </i-card>
        </section>
    </div>
</template>

<script>
import {dataRights} from 'API'
import {replaceArrLabel} from 'UTIL/assist'

export default {
    data () {
        return {
            dataRightsTree: [],
            baseInfo: []
        }
    },
    methods: {
        // 获取数据权限组树结构
        getDataRightsTree () {
            dataRights.getDataRightsTree({}).then(res => {
                replaceArrLabel(res.data, 'name', 'title')
                this.dataRightsTree = res.data
            }).catch(err => {
                this.$Message.error(err.message)
            })
        },
        // 选择某一节点
        selectNode (node) {
            this.baseInfo = node[0]
        }
    },
    mounted () {
        this.getDataRightsTree()
    }
}
</script>

<style scoped lang="less" src="STYLE/view/systemConf/systemConf.less">
</style>
<style>
</style>
