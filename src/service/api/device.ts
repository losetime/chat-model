import { $http } from '../http'

enum Api {
  getDeviceList = '',
  addDevice = '',
  batchAddDevice = '',
  deviceArchive = '',
  editDevice = '',
  delDevice = '',
}

/**
 * 获取设备列表
 */
export const apiGetDeviceList = (params: any): Promise<any> => {
  return $http.request({
    url: Api.getDeviceList,
    method: 'GET',
    params,
  })
}

/**
 * 添加设备
 */
export const apiAddDevice = (data: any): Promise<any> => {
  return $http.request({
    url: Api.addDevice,
    method: 'POST',
    data,
  })
}

/**
 * 批量添加设备
 */
export const apiBatchAddDevice = (file: any): Promise<any> => {
  const formData = new FormData()
  formData.append('file', file)
  return $http.request({
    url: Api.batchAddDevice,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

/**
 * 编辑设备
 */
export const apiEditDevice = (params: any): Promise<any> => {
  return $http.request({
    url: Api.editDevice,
    method: 'Post',
    params,
  })
}

/**
 * 查看设备档案
 */
export const apiDeviceArchive = (params: any): Promise<any> => {
  return $http.request({
    url: Api.deviceArchive,
    method: 'GET',
    params,
  })
}

/**
 * 删除设备
 */
export const apiDelDevice = (data: any): Promise<any> => {
  return $http.request({
    url: Api.delDevice,
    method: 'POST',
    data,
  })
}
