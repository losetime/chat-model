import { $http } from '../http'

/**
 * 文件上传
 */
export const apiFileUpload = (data: any): Promise<any> => {
  return $http.uploadFiles({
    url: '/papi/file/upload',
    method: 'POST',
    data,
  })
}

// 文件下载
export const apiFileDownload = (url: string, params?: any): Promise<any> => {
  return $http.request({
    url,
    method: 'GET',
    responseType: 'blob',
    params,
  })
}
