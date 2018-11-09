<template>
    <div id="loginLog">
        <i-card title="操作日志" icon="ios-cog">
            <!-- 功能按钮区 -->
            <div class="actionBlock">
                <i-date-picker type="daterange" :options="dateOptions" placement="bottom-end" placeholder="请选择查询时间段（选填）" style="width: 200px" format="yyyy/MM/dd" @on-change="changeDate" v-model="searchDate"></i-date-picker>
                <i-select v-model="logSource" style="width:200px" placeholder="请选择日志来源（选填）">
                    <i-option label="操作权限组" value="operateRights"></i-option>
                    <i-option label="默认" value="default"></i-option>
                </i-select>
                <i-select v-model="logRange" style="width:200px" placeholder="请选择日志等级（选填）">
                    <i-option label="信息" value="info"></i-option>
                    <i-option label="警告" value="warning"></i-option>
                    <i-option label="错误" value="error"></i-option>
                </i-select>
                <i-button>搜索</i-button>
                <i-button @click="handleReset">重置</i-button>
            </div>
            <inner-card title="查询结果">
                <!-- 列表 -->
                <i-table stripe ref="logList" :columns="logListCols" :data="logList" :loading="isListLoading"></i-table>
                <!-- 分页 -->
                <div class="pagination-wrapper">
                    <div class="pagination">
                        <i-page :total="10" :current="1"></i-page>
                    </div>
                </div>
            </inner-card>
        </i-card>
    </div>
</template>

<script>
import {log} from 'API'
import InnerCard from 'WIDGET/inner/InnerCard'

export default {
    data () {
        return {
            searchDate: '',
            logSource: '',
            logRange: '',
            dateOptions: {
                shortcuts: [
                    {
                        text: '一周',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            return [start, end]
                        }
                    },
                    {
                        text: '一个月',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            return [start, end]
                        }
                    },
                    {
                        text: '一季度',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            return [start, end]
                        }
                    },
                    {
                        text: '一年',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
                            return [start, end]
                        }
                    }
                ]
            },
            logListCols: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '用户',
                    key: 'userName'
                },
                {
                    title: '登录账号',
                    key: 'loginName'
                },
                {
                    title: '登录时间',
                    key: 'loginTimeStr'
                },
                {
                    title: '登录IP',
                    key: 'address'
                },
                {
                    title: '登录结果',
                    key: 'loginResultDisplay'
                },
                {
                    title: '时长',
                    key: 'timeLast'
                },
                {
                    title: '离线状态',
                    key: 'offlineStatusDisplay'
                },
                {
                    title: '操作日志',
                    key: 'logCount'
                }
            ],
            logList: [],
            isListLoading: false
        }
    },
    components: {
        InnerCard
    },
    methods: {
        getLoginLog () {
            this.isListLoading = true
            log.getLoginLog({}).then(res => {
                this.logList = res.data.rows
                this.isListLoading = false
            }).catch(err => {
                this.isListLoading = false
                this.$Message.error(err.message)
            })
        },
        changeDate (dateRange) {
            this.searchDate = dateRange
        },
        handleReset () {
            this.searchDate = []
            this.logSource = ''
            this.logRange = ''
        }
    },
    mounted () {
        this.getLoginLog()
    }
}
</script>

<style>
</style>
