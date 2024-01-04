import { $http } from '@/service/http/index'

/**
 * 获取职位列表
 */
export const apiGetPositionList = (params: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'get',
    params,
  })

/**
 * 新增职位
 */
export const apiAddPosition = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 编辑职位
 */
export const apiEditPosition = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 删除职位
 */
export const apiDelPosition = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })
