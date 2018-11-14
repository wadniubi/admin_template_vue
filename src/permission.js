import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {windowsSaveLoginData, windowsGetLoginData} from './util/tools'

const whiteList = ['/login'] // 不需要登陆的白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log('跳转方向:', to.fullPath + to.path)
  var windowStore = windowsGetLoginData() // 或取session中暂存的信息
  if (windowStore.authInfo && windowStore.lastModifiedTime) { // 信息未过期
    if (to.path === '/login') { // already login
      next({ path: '/' })
      NProgress.done()
    } else {
      windowsSaveLoginData(windowStore.authInfo)
      if (store.getters.authInfo.roles.length === 0) { // 刷新会移除sessionStore里面的数据
        store.commit('SET_AUTH_INFO', windowStore.authInfo)
        let roles = windowStore.authInfo.roles
        store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
