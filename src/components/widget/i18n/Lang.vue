<template>
    <i-dropdown @on-click="setLang" class="configBtn">
        <span>
            {{$t('change.lang')}}
            <Icon type="ios-arrow-down"></Icon>
        </span>
        <i-dropdown-menu slot="list" placement="bottom-end">
            <i-dropdown-item name="zh">简体中文</i-dropdown-item>
            <i-dropdown-item name="en">English</i-dropdown-item>
        </i-dropdown-menu>
    </i-dropdown>
</template>

<script>
export default {
    name: 'bds-lang',
    methods: {
        setLang (lang) {
            this.lang = lang
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
                this.$emit('on-change', lang)
            }
        }
    }
}
</script>
