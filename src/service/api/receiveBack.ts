import { $http } from '../http'

/**
 * 领还列表
 */
export const apiGetReceiveBackList = (params: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'GET',
    params,
  })

/**
 * 领用设备
 */
export const apiReceiveDevice = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 归还设备
 */
export const apiBackDevice = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })
