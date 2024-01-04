import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { AxiosCanceler } from './axiosCancel'
import { encipherRequestMiddleware, decryptResponseMiddleware } from '@/service/http/encipherHelper'
import { handleAxiosCancelerMiddleware, handleTokenMiddleware } from '@/service/http/requestHelper'
import {
  handleDownloadFileMiddleware,
  handleBusinessExceptionMiddleware,
  handleNetworkExceptionMiddleware,
} from '@/service/http/responseHelper'

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  const axiosCanceler = new AxiosCanceler()

  // 请求拦截器
  axiosInstance.interceptors.request.use(
    (config: any) => {
      if (config.headers) {
        config = handleTokenMiddleware(config)
        config = encipherRequestMiddleware(config)
        handleAxiosCancelerMiddleware(config)
      }
      return config
    },
    (error: Error) => {
      // 对请求错误做些什么
      return Promise.reject(error)
    },
  )

  // 响应拦截器
  axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => {
      res = decryptResponseMiddleware(res)
      res.config && axiosCanceler.removePending(res.config)
      handleDownloadFileMiddleware(res)
      return handleBusinessExceptionMiddleware(res)
    },
    (error) => {
      // 是否是被取消的请求
      if (axios.isCancel(error)) {
        console.warn('请求被取消：', error)
        return Promise.resolve()
      } else {
        handleNetworkExceptionMiddleware(error)
        return Promise.reject()
      }
    },
  )
}
