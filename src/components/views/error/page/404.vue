<template>
    <div class="notfoud-container">
        <div class="img-404">
        </div>
        <p class="notfound-p">哎呀迷路了...</p>
        <div class="notfound-reason">
            <p>可能的原因：</p>
            <ul>
                <li>原来的页面不存在了</li>
                <li>我们的服务器被外星人劫持了</li>
            </ul>
        </div>
        <div class="notfound-btn-container">
            <a class="notfound-btn" href="/">返回首页</a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Page404'
}
</script>

<style lang="less" scoped src="STYLE/view/error/404/404.less">
</style>
