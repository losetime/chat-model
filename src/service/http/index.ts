import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { setupInterceptors } from './interceptor'
// import { validateParamsMiddleware } from '@/service/http/requestHelper'

// 创建 axios 请求实例
export const serviceAxios: AxiosInstance = axios.create({
  baseURL: '', // 基础请求地址
  timeout: 10000, // 请求超时设置
  withCredentials: false, // 跨域请求是否需要携带 cookie
})

setupInterceptors(serviceAxios)

export const $http = {
  request: (config: any) => {
    // const { isCanceler } = validateParamsMiddleware(config)
    // if (isCanceler) {
    //   return Promise.resolve({ code: -1 })
    // } else {
    //   return serviceAxios(config)
    // }
    return serviceAxios(config)
  },
  // 上传请求
  uploadFiles: (config: any) => {
    const formData = new FormData()
    Object.keys(config.data).forEach((key) => {
      formData.append(key, config.data[key as any])
    })
    config.data = formData
    config.headers = {
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
    return serviceAxios(config)
  },
}
