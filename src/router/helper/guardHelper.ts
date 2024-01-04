import { router } from '../index'
// import { useAppStoreWithOut } from '@/store/modules/app'
import type { RouteLocationNormalized } from 'vue-router'

export const beforeGuard = () => {
  // 由于如果页面被刷新，路由参数会丢失，因为重新请求了路由接口
  // 该标志位的意思如果页面刷新，则通过该标志位告知，防止无限路由循环
  // let flagBit = true
  router.beforeEach(async (to: RouteLocationNormalized, _from, next) => {
    // const appStore = useAppStoreWithOut()
    console.log(to, _from)
    next()
    // 判断token是否存在
    // if (!appStore.token && to.name !== 'Login') {
    //   // const findItem = setRouteHistory(to)
    //   // appStore.activeRouter = { name: to.name }
    //   // if (findItem && flagBit) {
    //   //   flagBit = false
    //   //   next()
    //   // } else {
    //   //   next()
    //   // }
    //   next({ name: 'Login' })
    // } else {
    //   next()
    // }
  })
}

/**
 * @desc 设置路由历史
 */
// const setRouteHistory = (to: RouteLocationNormalized) => {
//   const appStore = useAppStoreWithOut()
//   const routeHistory = appStore.routeHistory
//   const findIndex = routeHistory.findIndex((item: any) => item.routerName === to.name)
//   if (findIndex === -1 && to.name) {
//     appStore.routeHistory.push({
//       title: to.meta.title as string,
//       routerName: to.name as string,
//       closable: routeHistory.length > 0 ? true : false,
//       query: to.query,
//     })
//   } else {
//     return routeHistory[findIndex]
//   }
// }
