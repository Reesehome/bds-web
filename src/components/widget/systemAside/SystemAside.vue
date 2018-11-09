<template>
    <!-- 该组件作用: 提供系统管理模块的左侧结构。
            默认内容为树结构，如要更改内容插槽，要同时设置showDefaultContent='false' -->
    <i-card :title="title" :icon="icon">
        <!-- 附加操作 -->
        <div slot="extra">
            <slot name="actionBlock"></slot>
        </div>
        <!-- 内容 -->
        <i-tree v-if="showDefaultContent" :data="asideTree" :show-checkbox="showCheckbox" @on-select-change="selectNode"></i-tree>
        <slot v-else name="content"></slot>
    </i-card>
</template>

<script>

export default {
    name: 'system-aside',
    props: {
        title: {
            require: true,
            type: String,
            default: '系统配置目录'
        },
        icon: {
            type: String,
            default: 'ios-cog'
        },
        showDefaultContent: {
            type: Boolean,
            default: true
        },
        asideTree: {
            require: true,
            type: Array
        },
        showCheckbox: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {

        }
    },
    methods: {
        // 选择某一节点
        selectNode (node) {
            this.$emit('sendTreeNode', node[0])
        }
    }
}
</script>
