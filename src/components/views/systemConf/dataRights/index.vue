<template>
    <system-conf id="dataRights">
        <!-- 菜单目录 -->
        <system-aside slot="systemAside" title="数据权限结构" :asideTree="dataRightsTree" @sendTreeNode="getSelectedNode"></system-aside>
        <!-- 编辑区 -->
        <i-card slot="systemEditor" title="数据权限-编辑区" icon="ios-cog">
            <i-button slot="extra" type="primary">保存</i-button>
            <inner-card title="修改基本信息">
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
            </inner-card>
        </i-card>
    </system-conf>
</template>

<script>
import {dataRights} from 'API'
import {replaceArrLabel} from 'UTIL/assist'
import SystemConf from 'VIEW/layout/SystemConf'
import SystemAside from 'WIDGET/systemAside/SystemAside'
import InnerCard from 'WIDGET/inner/InnerCard'

export default {
    data () {
        return {
            dataRightsTree: [],
            baseInfo: []
        }
    },
    components: {
        SystemAside,
        SystemConf,
        InnerCard
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
        getSelectedNode (data) {
            this.baseInfo = data
        }
    },
    mounted () {
        this.getDataRightsTree()
    }
}
</script>
