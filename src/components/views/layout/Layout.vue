<template>
    <div style="height:100%">
        <!--导航栏部分-->
        <bds-nav :theme="theme" :menus="menus" @on-select="toPath"></bds-nav>
        <router-view class="layoutContent" />
        <footer class="layoutFooter">Copyright © 2018 Tisson. All Rights Reserved. 天讯瑞达公司 版权所有</footer>
    </div>
</template>

<script>
import {layout} from 'API'
import BdsNav from 'WIDGET/nav/Nav'

export default {
    data () {
        return {
            theme: 'dark',
            menus: {}
        }
    },
    methods: {
        /**
             * 获取菜单
             */
        getMenuOnce () {
            layout.getMenuOnce({}).then(res => {
                let menus = {
                    show: {},
                    hide: {}
                }
                res.data.forEach(item => {
                    if (item.parentId) {
                        return
                    }
                    // 设置导航条的快捷菜单
                    if (item.parent) {
                        menus.hide[item.id] = item
                    } else {
                        menus.show[item.id] = item
                    }
                    // 设置父子关系
                    item.children = []
                    res.data.forEach(i => {
                        if (i.parentId === item.id) {
                            item.children.push(i)
                        }
                    })
                })
                this.menus = menus
            }).catch(err => {
                this.$Message.error(err.message)
            })
        },
        toPath (url) {
            this.$router.push({path: url || '/'})
        }
    },
    computed: {
        lang: {
            get () {
                return this.$store.state.app.language
            },
            set (lang) {
                this.$i18n.locale = lang
                this.$store.dispatch('setLanguage', lang)
            }
        }
    },
    components: {
        BdsNav
    },
    created () {
        this.getMenuOnce()
    }
}
</script>

<style lang="less">
</style>
