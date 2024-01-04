import { $http } from '../http'

enum Api {
  getSignInfoList = '',
  gethealthInfoList = '',
  getHealthRiskInfo = '',
  getWarnInfoList = '',
}

// -------------------------------------- 体征监测 -----------------------------------------------

/**
 * 获取体征监测列表
 */
export const apiGetSignInfoList = (params: any): Promise<any> => {
  return $http.request({
    url: Api.getSignInfoList,
    method: 'GET',
    params,
  })
}

// -------------------------------------- 健康异常 -----------------------------------------------

/**
 * 获取健康异常列表
 */
export const apiGethealthInfoList = (params: any): Promise<any> => {
  return $http.request({
    url: Api.gethealthInfoList,
    method: 'GET',
    params,
  })
}

/**
 * @desc 获取健康风险
 */
export const apiGetHealthRiskInfo = (params: any): Promise<any> => {
  return $http.request({
    url: Api.getHealthRiskInfo,
    method: 'GET',
    params,
  })
}

// -------------------------------------- 告警信息 -----------------------------------------------

/**
 * 获取告警信息列表
 */
export const apiGetWarnInfoList = (params: any): Promise<any> => {
  return $http.request({
    url: Api.getWarnInfoList,
    method: 'GET',
    params,
  })
}
