<template>
    <div class="inner-card">
        <!-- 标题 -->
        <p class="card-head">{{title}}</p>
        <!-- 操作按钮 -->
        <!-- 内容 -->
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InnerCard',
    props: {
        title: {
            type: String,
            default: '内置卡片标题'
        }
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="less" scoped src="STYLE/widget/inner/innerCard.less"></style>
