import { useAppStoreWithOut } from '@/store/modules/app'
import { AxiosCanceler } from './axiosCancel'
import useMessage from '@/hooks/useMessage'

const { createMessage } = useMessage()

/**
 * @desc 设置token
 */
export const handleTokenMiddleware = (config: any) => {
  const appStore = useAppStoreWithOut()
  if (appStore.token) {
    config.headers.Authorization = `Bearer ${appStore.token}`
  }
  return config
}

/**
 * @desc 设置取消请求
 */
export const handleAxiosCancelerMiddleware = (config: any) => {
  const axiosCanceler = new AxiosCanceler()
  if (!config.headers.ignoreCancelToken) {
    axiosCanceler.addPending(config)
  }
  return config
}

/**
 * @desc 添加自定义请求头
 */
// export const handleHeaderFieldMiddleware = (config: any) => {
//   const appStore = useAppStoreWithOut()
//   const deptId = appStore.activeDept.deptId
//   if (deptId !== -1 && config.headers) {
//     config.headers['Pretend-Dept'] = encodeURIComponent(deptId)
//   }
//   return config
// }

/**
 * @desc 请求参数校验
 */
export const validateParamsMiddleware = (config: any) => {
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9\s,.!?:;@()-]{0,100}$/
  let params: any = {}
  if (config.method === 'GET') {
    params = config.params || {}
  } else if (config.method === 'POST') {
    params = config.data || {}
  }
  for (const key in params) {
    if (!reg.test(params[key])) {
      createMessage.error('请求参数值非法，请检查')
      return { isCanceler: true }
    }
  }
  return { isCanceler: false }
}
