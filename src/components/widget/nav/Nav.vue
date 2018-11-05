<template>
    <div id="nav" :class="`bds-color-${theme}`">
        <i-row>
            <i-col class="nav-logo" :lg="4" :xs="6">
                <img src="../../../assets/images/logo.png" alt="" height="30">
            </i-col>
            <!-- 默认横向导航 -->
            <i-col class="nav-menu" :lg="16" :xs="0">
                <i-menu :mode="mode" :theme="theme" active-name="1" @on-select="onSelected">
                    <div v-for="(item, index) in menus.show" :key="index">
                        <i-submenu v-if="item.children.length!==0" :name="index">
                            <template slot="title">
                                <i :class="item.iconSkin"></i>
                                {{item.name}}
                            </template>
                            <i-menu-item v-for="(child, i) in item.children" :key="i" :name="i" :to="child.url">{{child.name}}</i-menu-item>
                        </i-submenu>
                        <i-menu-item v-else :to="item.url" :name="index">
                            <i :class="item.iconSkin"></i>
                            {{item.name}}
                        </i-menu-item>
                    </div>

                    <i-submenu v-if="Object.keys(this.menus.hide || {}).length > 0" name="5000">
                        <template slot="title">更多</template>
                        <i-menu-item v-for="(item, index) in menus.hide" v-if="item" :key="index + 5000" :name="index + 5000">
                            <i :class="item.iconSkin"></i>
                            {{item.name}}
                        </i-menu-item>
                    </i-submenu>
                </i-menu>
            </i-col>
            <i-col class="nav-config" :lg="4" :xs="18">
                <!-- 展开菜单 -->
                <i-icon type="md-menu" class="configBtn hidden-lg pull-right" :class="{'rotate90':isShowVerticalNav}" @click="showVerticalNav" />
                <!-- 切换语言 -->
                <bds-lang class="hidden-md hidden-sm hidden-xs pull-right" />
                <!-- 个人信息 -->
                <i-dropdown @on-click="onSelected" class="configBtn pull-right">
                    <span class="hidden-md hidden-sm hidden-xs">
                        {{$t('layout.welcome')}}, 马云
                        <i-icon type="ios-arrow-down" />
                    </span>
                    <i-icon type="ios-contact" class="hidden-lg" />
                    <i-dropdown-menu slot="list" placement="bottom-end">
                        <i-dropdown-item name="zh">修改密码</i-dropdown-item>
                        <i-dropdown-item name="en">个性化设置</i-dropdown-item>
                        <i-dropdown-item name="en">注销</i-dropdown-item>
                    </i-dropdown-menu>
                </i-dropdown>
            </i-col>
        </i-row>
        <!-- 响应式导航栏 -->
        <transition name="slide-up">
            <i-menu mode="vertical" :theme="theme" active-name="1" @on-select="onSelected" width="100%" class="verticalNav" v-show="isShowVerticalNav">
                <div v-for="(item, index) in menus.show" :key="index" :name="index">
                    <i-submenu v-if="item.children.length!==0" :name="index">
                        <template slot="title">
                            <i :class="item.iconSkin"></i>
                            {{item.name}}
                        </template>
                        <i-menu-item v-for="(child, i) in item.children" :key="i" :name="i">{{child.name}}</i-menu-item>
                    </i-submenu>
                    <i-menu-item v-else :name="index">
                        <i :class="item.iconSkin"></i>
                        {{item.name}}
                    </i-menu-item>
                </div>
                <i-submenu v-if="Object.keys(this.menus.hide || {}).length > 0" name="5000">
                    <template slot="title"></template>
                    <i-menu-group title="更多">
                        <i-menu-item v-for="(item, index) in menus.hide" v-if="item" :key="index + 5000" :name="index + 5000">
                            <i :class="item.iconSkin"></i>
                            {{item.name}}
                        </i-menu-item>
                    </i-menu-group>
                </i-submenu>
            </i-menu>
        </transition>
    </div>
</template>

<script>
import BdsLang from '../i18n/Lang'

export default {
    name: 'bds-nav',
    components: {BdsLang},
    data () {
        return {
            isShowVerticalNav: false
        }
    },
    methods: {
        // 点击导航跳转
        onSelected (index) {
            // this.isShowVerticalNav = !this.isShowVerticalNav
            // this.$emit('on-select', this.menus[index].url)
        },
        // 点击展开按钮
        showVerticalNav () {
            this.isShowVerticalNav = !this.isShowVerticalNav
        }
    },
    props: {
        mode: {
            type: String,
            default: 'horizontal'
        },
        menus: Object,
        theme: {
            type: String,
            default: 'light'
        }
    }
}
</script>

<style lang="less" scoped src="STYLE/widget/nav/nav.less">
</style>
