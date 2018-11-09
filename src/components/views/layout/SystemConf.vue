<template>
    <!-- 该组件作用: 提供系统管理模块的基本左右结构。
            要配合systemAside组件和slot使用 -->
    <div>
        <i-row :gutter="24" class="systemConf">
            <i-col :sm="6" :xs="24" class="systemConf-aside">
                <slot name="systemAside"></slot>
            </i-col>
            <i-col :sm="18" :xs="24" class="systemConf-editor">
                <slot name="systemEditor"></slot>
            </i-col>
        </i-row>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    }
}
</script>

<style scoped lang="less" src="STYLE/view/systemConf/systemConf.less">
</style>
