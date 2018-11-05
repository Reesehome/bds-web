// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import * as filters from './filters' // global filters
import './mock' // simulation data
import './permission/permission' // permission control
import i18n from './lang' // Internationalization
import 'STYLE/index.less' // global style
import 'SRC/assets/fonts/simple-line-icons.min.css' // 基础平台图标样式

/* Import or require Vue and Vue Material START */
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
import 'STYLE/theme/theme.less'

// Vue.use(iView)
/* Import or require Vue and Vue Material END */

// you can set only in production env show the error-log
if (process.env.NODE_ENV === 'production') {
    Vue.config.errorHandler = function (err, vm, info, a) {
        // Don't ask me why I use Vue.nextTick, it just a hack.
        // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
        Vue.nextTick(() => {
            store.dispatch('addErrorLog', {
                err,
                vm,
                info,
                url: window.location.href
            })
            console.error(err, info)
        })
    }
}

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

const vm = new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App },
    i18n: i18n,
    render: h => h(App)
})

FastClick.attach(document.body)

export {
    vm
}
