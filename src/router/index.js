// import Vue from 'vue'
import Router from 'vue-router'

/* Layout 父路由页面 */
import Layout from 'VIEW/layout/Layout'
/* Router Modules */
import components from './modules/components'

// Vue.use(Router)

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 * */

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 * */
export const constantRouterMap = [
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('VIEW/dashboard/Dashboard'),
                name: 'Dashboard'
            },
            // 系统管理模块-菜单管理
            {
                path: '/system/menuSettings',
                name: 'MenuSetting',
                component: () => import('VIEW/systemConf/menuSettings/index')
            },
            // 系统管理模块-菜单模块
            {
                path: '/system/menuModule',
                name: 'MenuModule',
                component: () => import('VIEW/systemConf/menuSettings/MenuModule')
            },
            // 系统管理模块-组织机构
            {
                path: '/system/organization',
                name: 'Organization',
                component: () => import('VIEW/systemConf/organization/index')
            },
            // 系统管理模块-操作权限
            {
                path: '/system/operateRights',
                name: 'OperateRights',
                component: () => import('VIEW/systemConf/operateRights/index')
            },
            // 系统管理模块-操作权限
            {
                path: '/system/dataRights',
                name: 'DataRights',
                component: () => import('VIEW/systemConf/dataRights/index')
            },
            // 系统管理模块-字典维护
            {
                path: '/system/dictionary',
                name: 'Dictionary',
                component: () => import('VIEW/systemConf/dictionary/index')
            },
            // 系统管理模块-系统参数
            {
                path: '/system/paramSettings',
                name: 'ParamSettings',
                component: () => import('VIEW/systemConf/paramSettings/index')
            },
            // 系统管理模块-登录日志
            {
                path: '/system/loginLog',
                name: 'LoginLog',
                component: () => import('VIEW/systemConf/log/loginLog')
            },
            // 系统管理模块-操作日志
            {
                path: '/system/operateLog',
                name: 'OperateLog',
                component: () => import('VIEW/systemConf/log/operateLog')
            }
        ],
        meta: {
            title: '天讯瑞达基础平台',
            icon: 'basic platform',
            noCache: true
        }
    },
    {
        path: '/404',
        component: () => import('VIEW/error/page/404'),
        hidden: true
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = [
    ...components,
    {
        path: '/error',
        component: Layout,
        redirect: 'noredirect',
        name: 'ErrorPages',
        meta: {
            title: 'errorPages',
            icon: '404'
        },
        children: [
            {
                path: '404',
                component: () => import('VIEW/error/page/404'),
                name: 'Page404',
                meta: { title: 'page404', noCache: true }
            }
        ]
    },
    {
        path: '/error-log',
        redirect: 'noredirect',
        component: Layout,
        children: [
            {
                path: 'log',
                component: () => import('VIEW/error/log/index'),
                name: 'ErrorLog',
                meta: { title: 'errorLog', icon: 'bug' }
            }
        ]
    }
]
