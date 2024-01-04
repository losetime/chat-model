import { useAppStoreWithOut } from '@/store/modules/app'
// import { AxiosCanceler } from './axiosCancel'
import { debounce } from 'lodash-es'
import useMessage from '@/hooks/useMessage'
import { router } from '@/router'

const { createMessage, createModal } = useMessage()

/**
 * @desc 下载文件
 */
export const handleDownloadFileMiddleware = (res: any) => {
  if (res.config.responseType === 'blob') {
    try {
      // 后端需要指定显示，否则前端拿不到'content-disposition'这个属性
      // Response.Headers.Add("Access-Control-Expose-Headers", "Content-Disposition");
      const fileName = res.headers['content-disposition']?.split(';')[1].substr(9)
      // 判断IE10
      if ('msSaveOrOpenBlob' in window.navigator) {
        ;(window.navigator as any).msSaveOrOpenBlob(res.data, decodeURI(fileName))
      } else {
        const elink = document.createElement('a')
        elink.download = decodeURI(fileName)
        elink.href = URL.createObjectURL(res.data)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
      }
    } catch (error) {
      createMessage.error('下载失败，请重试')
    }
  }
  return Promise.resolve(res)
}

/**
 * @desc 业务异常处理
 */
export const handleBusinessExceptionMiddleware = (res: any) => {
  const appStore = useAppStoreWithOut()
  const { data }: { data: any } = res
  if (res.config.responseType !== 'blob' && data.code !== 20000) {
    switch (data.code) {
      // 没有权限(token失效)
      case 40001:
        createModal.error({
          title: '提示',
          content: data.msg,
          onOk() {
            appStore.$reset()
            router.replace('/login')
          },
        })
        break
      case 40009:
        createModal.error({
          title: '提示',
          content: data.msg,
          onOk() {
            appStore.$reset()
            router.replace('/login')
          },
        })
        break
      default:
        createMessage.error(data.msg)
    }
  }
  return Promise.resolve(data)
}

/**
 * @desc 网络异常处理
 */
export const handleNetworkExceptionMiddleware = debounce((error: any) => {
  const { response } = error || {}
  const { createMessage } = useMessage()
  if (response && response.status) {
    switch (response.status) {
      case 401:
        createMessage.error('用户没有权限（令牌、用户名、密码错误）!')
        break
      case 403:
        createMessage.error('用户得到授权，但是访问是被禁止的。!')
        break
      case 404:
        createMessage.error('网络请求错误,未找到该资源!')
        break
      case 405:
        createMessage.error('网络请求错误,请求方法未允许!')
        break
      case 408:
        createMessage.error('网络请求超时!')
        break
      case 429:
        createMessage.error('网络请求次数过多!')
        break
      case 500:
        createMessage.error('服务器错误,请联系管理员!')
        break
      case 501:
        createMessage.error('网络未实现!')
        break
      case 502:
        createMessage.error('网络错误!')
        break
      case 503:
        createMessage.error('服务不可用，服务器暂时过载或维护!')
        break
      case 504:
        createMessage.error('网络超时!')
        break
      case 505:
        createMessage.error('http版本不支持该请求!')
        break
      default:
        createMessage.error('网络未知错误')
    }
  }
}, 1000)
