import type { Router } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { omit } from 'lodash-es'
import Layout from '@/layout/Layout.vue'

//Vite 支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块
const views = import.meta.glob('../../views/**/**.vue')
const components = import.meta.glob('../../components/**/**.vue')
const modules = Object.assign(views, components)

// 路由等级提升
export function promoteRouteLevel(routeModule: any) {
  const routerInfo: any = formattRouter([routeModule], [])[0]
  // 使用vue-router拼接菜单
  // createRouter 创建一个可以被 Vue 应用程序使用的路由实例
  let router: Router | null = createRouter({
    routes: [routerInfo],
    history: createWebHashHistory(),
  })
  // getRoutes： 获取路由记录的完整列表。
  const routes = router.getRoutes()
  // 将所有子路由添加到二级路由
  addToChildren(routes, routerInfo.children || [], routerInfo)
  router = null
  // omit lodash的函数 对传入的item对象的children进行删除
  routerInfo.children = routerInfo.children?.map((item: any) => omit(item, 'children'))
  return routerInfo
}

// 将所有子路由添加到二级路由
function addToChildren(routes: any[], children: any[], routeModule: any) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const route = routes.find((item) => item.name === child.name)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find((item: any) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as any)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}

/**
 * @desc 格式化后端返回的路由信息
 */
const formattRouter = (data: any[], routerArr: any[]): any[] => {
  for (const [index, item] of data.entries()) {
    const path = item.path.includes('http') ? '/' : item.path
    const component = item.level === 1 ? Layout : modules[`../../${item.component}.vue`]
    if (item.routerName === 'UserCenter') {
      routerArr.push({
        path: path,
        name: item.routerName,
        component: modules[`../../${item.component}.vue`],
        meta: {
          title: item.menuName,
          level: item.level,
          icon: item.icon,
          visible: item.visible === '0',
        },
        children: [],
      })
    } else {
      routerArr.push({
        path: path,
        name: item.routerName,
        component: component,
        meta: {
          title: item.menuName,
          level: item.level,
          icon: item.icon,
          visible: item.visible === '0',
        },
        children: [],
      })
    }

    if (item.children.length > 0) {
      formattRouter(item.children, routerArr[index].children)
    }
  }
  return routerArr
}
