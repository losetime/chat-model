import { $http } from '@/service/http/index'

/**
 * 获取班组列表
 */
export const apiGetClassGroupList = (params: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'get',
    params,
  })

/**
 * 新增班组
 */
export const apiAddClassGroup = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 编辑班组
 */
export const apiEditClassGroup = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 删除班组
 */
export const apiDelClassGroup = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })
