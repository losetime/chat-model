import { $http } from '@/service/http/index'

/**
 * 获取版本列表
 */
export const apiGetVersionsList = (params: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'get',
    params,
  })

/**
 * 新增版本
 */
export const apiAddVersions = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 编辑版本
 */
export const apiEditVersions = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 发布版本
 */
export const apiPushVersions = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 删除版本
 */
export const apiDelVersions = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })
