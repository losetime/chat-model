import { $http } from '../http'

/**
 * 获取应急预案列表
 */
export const apiGetPlanList = (params: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'get',
    params,
  })

/**
 * 新增预案
 */
export const apiAddPlan = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 编辑预案
 */
export const apiEditPlan = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 删除预案
 */
export const apiDelPlan = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })
