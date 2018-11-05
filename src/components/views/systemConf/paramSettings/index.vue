<template>
    <div id="paramSettings">
        <i-card title="系统参数查询" icon="ios-cog">
            <!-- 功能按钮区 -->
            <div class="actionBlock">
                <i-input placeholder="变量关键字或变量值" style="width: auto">
                    <i-icon type="ios-search" slot="suffix" class="searchBtn" />
                </i-input>
                <i-button @click="isShowModal = true; paramListItem = {};modalType = 'add'">新增</i-button>
                <i-button @click="clickEditBtn">编辑</i-button>
                <i-button>删除</i-button>
            </div>
            <!-- 列表 -->
            <i-table stripe :columns="paramListCols" :data="paramList" @on-selection-change="handleSelectParam" :loading="isListLoading"></i-table>
            <!-- 分页 -->
            <div class="pagination-wrapper">
                <div class="pagination">
                    <i-page :total="10" :current="1"></i-page>
                </div>
            </div>
        </i-card>
        <!-- 新增／修改模态框 -->
        <i-modal v-model="isShowModal" :title="`${modalTypeConst[modalType]}系统参数`">
            <i-form :label-width="100" v-model="paramListItem">
                <i-form-item label="变量关键字">
                    <i-input v-model="paramListItem.propKey"></i-input>
                </i-form-item>
                <i-form-item label="变量值">
                    <i-input v-model="paramListItem.propValue"></i-input>
                </i-form-item>
                <i-form-item label="是否可删除">
                    <i-radio-group v-model="paramListItem.deletable">
                        <i-radio label="Y">是</i-radio>
                        <i-radio label="N">否</i-radio>
                    </i-radio-group>
                </i-form-item>
                <i-form-item label="说明">
                    <i-input type="textarea" v-model="paramListItem.remark"></i-input>
                </i-form-item>
            </i-form>
        </i-modal>
    </div>
</template>

<script>
import {paramSettings} from 'API'
export default {
    data () {
        return {
            paramListCols: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '变量关键字',
                    key: 'propKey'
                },
                {
                    title: '变量值',
                    key: 'propValue'
                },
                {
                    title: '说明',
                    key: 'remark'
                },
                {
                    title: '是否可删除',
                    key: 'deletable'
                }
            ],
            paramList: [],
            paramListItem: {},
            selectedParams: [],
            modalType: '',
            modalTypeConst: {
                'add': '新增',
                'edit': '修改'
            },
            isListLoading: false,
            isShowModal: false
        }
    },
    methods: {
        // 获取所有系统参数
        getParamList () {
            this.isListLoading = true
            paramSettings.getParamList({}).then(res => {
                this.isListLoading = false
                this.paramList = res.data.rows
            }).catch(err => {
                this.isListLoading = false
                this.$Message.error(err.message)
            })
        },
        // 勾选／反选参数
        handleSelectParam (selection) {
            this.selectedParams = selection
        },
        // 点击编辑按钮
        clickEditBtn () {
            const selectedLength = this.selectedParams.length
            if (!selectedLength) {
                this.$Message.warning('请勾选参数')
                return
            }
            if (selectedLength !== 1) {
                this.$Message.warning('请单选参数')
                return
            }
            this.paramListItem = this.selectedParams[0]
            this.modalType = 'edit'
            this.isShowModal = true
        }
    },
    mounted () {
        this.getParamList()
    }
}
</script>

<style scoped lang="less" src="STYLE/view/systemConf/systemConf.less">
</style>
