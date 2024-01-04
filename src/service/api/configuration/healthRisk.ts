import { $http } from '@/service/http/index'

/**
 * 获取健康风险列表
 */
export const apiGethealthRiskList = (params: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'get',
    params,
  })

/**
 * 新增健康风险
 */
export const apiAddhealthRisk = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 编辑健康风险
 */
export const apiEdithealthRisk = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 删除健康风险
 */
export const apiDelhealthRisk = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })
