// 3// import router from './router'
// // import store from './store'
// // import { Message } from 'element-ui'
// // import NProgress from 'nprogress' // progress bar
// // import 'nprogress/nprogress.css' // progress bar style
// // import { getToken } from '@/utils/auth' // get token from cookie
// // import getPageTitle from '@/utils/get-page-title'

// // NProgress.configure({ showSpinner: false }) // NProgress Configuration

// // const whiteList = ['/login'] // no redirect whitelist

// // router.beforeEach(async(to, from, next) => {
// //   // start progress bar
// //   NProgress.start()

// //   // set page title
// //   document.title = getPageTitle(to.meta.title)

// //   // determine whether the user has logged in
// //   const hasToken = getToken()

// //   if (hasToken) {
// //     if (to.path === '/login') {
// //       // if is logged in, redirect to the home page
// //       next({ path: '/' })
// //       NProgress.done()
// //     } else {
// //       const hasGetUserInfo = store.getters.name
// //       if (hasGetUserInfo) {
// //         next()
// //       } else {
// //         try {
// //           // get user info
// //           await store.dispatch('user/getInfo')

// //           next()
// //         } catch (error) {
// //           // remove token and go to login page to re-login
// //           await store.dispatch('user/resetToken')
// //           Message.error(error || 'Has Error')
// //           next(`/login?redirect=${to.path}`)
// //           NProgress.done()
// //         }
// //       }
// //     }
// //   } else {
// //     /* has no token*/

// //     if (whiteList.indexOf(to.path) !== -1) {
// //       // in the free login whitelist, go directly
// //       next()
// //     } else {
// //       // other pages that do not have permission to access are redirected to the login page.
// //       next(`/login?redirect=${to.path}`)
// //       NProgress.done()
// //     }
// //   }
// // })

// // router.afterEach(() => {
// //   // finish progress bar
// //   NProgress.done()
// // })

// // 自己构建
// // 权限拦截 导航守卫 导航守卫
// import router from '@/router' // 引入路由实例
// import store from '@/store' // 引入vuex store实例
// import nprogress from 'nprogress' // 引入一份进度条插件
// import 'nprogress/nprogress.css' // 引入进度条样式

// // 定义白名单 所有不受权限控制的页面
// const whiteList = ['/login', '/404']
// // 路由的前置守卫
// router.beforeEach(async function(to, from, next) {
// // 路由实例 to
//   nprogress.start()
//   if (store.getters.token) { // 判断是否有token
//     if (to.path === '/login') { // 判断是否在登入页
//       next('/') //
//     } else {
//       if (!store.getters.userId) {
//         await store.dispatch('user/getUserInfo') // 使用await让它等待，这是个异步函数，不然会跳过执行next
//       }
//       next()
//     }
//   } else {
//     if (whiteList.indexOf(to.path) > -1) { // 判断白名单里是否有
//       next()
//     } else {
//       next('/login')
//     }
//   }
//   nprogress.done() // 手动强制关闭一次 ，为了解决 手动切换地址时 进度条的不关闭的问题
// })

// // 后置守卫
// router.afterEach(function() {
//   nprogress.done() // 关闭进度条
// })
import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

// 导航守卫
const whitelist = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/') // 跳到主页
    } else {
      // if (!store.getters.userId) {
      //   // await store.dispatch('user/getUserInfo')
      //   console.log(store.getters.userId)
      // }
      // next()
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo') // 使用await让它等待，这是个异步函数，不然会跳过执行next
      }
      next()
    }
  } else {
    if (whitelist.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done()
})
router.afterEach(() => {
  nprogress.done()
})
