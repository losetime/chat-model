import { $http } from '@/service/http/index'

/**
 * 获取设备型号列表
 */
export const apiGetDeviceTypeList = (params: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'get',
    params,
  })

/**
 * 新增设备型号
 */
export const apiAddDeviceType = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 编辑设备型号
 */
export const apiEditDeviceType = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 删除设备型号
 */
export const apiDelDeviceType = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })
