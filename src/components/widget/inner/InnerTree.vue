<template>
    <div class="inner-card-tree">
        <h4 class="title">{{title}}</h4>
        <i-tree :data="data" :show-checkbox="showCheckbox"></i-tree>
    </div>
</template>

<script>
export default {
    name: 'InnerTree',
    props: {
        title: {
            type: String,
            default: ''
        },
        data: {
            type: Array,
            require: true
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
    components: {

    }
}
</script>

<style lang="less" scoped src="STYLE/widget/inner/innerTree.less">
</style>
