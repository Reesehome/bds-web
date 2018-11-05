import router from 'SRC/router'
import iView from 'iview'

// permission judge function
// function hasPermission (roles, permissionRoles) {
//     return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start() // start progress bar
    next()
})

router.afterEach(() => {
    iView.LoadingBar.finish() // finish progress bar
})
