import { defineStore } from 'pinia'
import { store } from '@/store'
import { apiGetRoutersInfo } from '@/service/api/common'
import { apiGetUserInfo } from '@/service/api/login'
import { ResultEnum } from '@/enums/httpEnum'
import { promoteRouteLevel } from '@/router/helper/routeHelper'
import { router } from '@/router'
import useMessage from '@/hooks/useMessage'

interface IProjectSection {
  bidName: string
  sectionCode: string
}

interface IRouteHistory {
  title: string
  routerName: string
  closable: boolean
  query: any
}

interface AppState {
  token: string
  // 用户相关信息
  userInfo: any
  // 项目标段
  projectSection: IProjectSection
  routeInfo: any[]
  sidebarStatus: boolean
  activeRouter: any
  routeHistory: IRouteHistory[]
  chatInfoList: any[]
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    token: '',
    userInfo: {},
    projectSection: {
      bidName: '',
      sectionCode: '',
    },
    routeInfo: [],
    sidebarStatus: false,
    activeRouter: '',
    routeHistory: [],
    chatInfoList: [],
  }),
  actions: {
    /**
     * @desc 获取路由信息
     */
    async GetRoutersInfo(): Promise<void> {
      const currentRoute = router.currentRoute.value.name as string
      console.log(currentRoute)
      const { code, data } = await apiGetRoutersInfo()
      if (code === ResultEnum.SUCCESS) {
        this.routeInfo = data
        // 用户没有可以查看的页面
        if (data.length <= 0) {
          this.token = ''
          const { createMessage } = useMessage()
          createMessage.warn('用户没有可以查看的页面')
        } else {
          const routes = ['Home', 'Setting', 'UserCenter', 'Notice']
          for (const item of data) {
            if (routes.includes(item.routerName)) {
              const routerModule = promoteRouteLevel(item)
              router.addRoute(routerModule)
            }
          }
          if (currentRoute === 'Login') {
            const firstLevelRoute = router.getRoutes().filter((val: any) => val.meta.level === 1)
            const routerName = firstLevelRoute[0].name
            router.replace({ name: routerName })
          } else {
            router.replace({ name: currentRoute })
          }
        }
      }
    },
    /**
     * @desc 获取用户信息
     */
    async GetUserInfo(): Promise<void> {
      const { code, data } = await apiGetUserInfo()
      if (code === 20000) {
        this.userInfo = {
          ...this.userInfo,
          userName: data.user.userName,
          userId: data.user.userId,
          permissions: data.permissions,
        }
      }
    },
  },
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
