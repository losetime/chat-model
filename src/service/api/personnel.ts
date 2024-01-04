import { $http } from '../http'

enum Api {
  getPersonnelList = '',
  addPersonnelInfo = '',
  editPersonnelInfo = '',
  delPersonnel = '',
  syncPersonnelInfo = '',
}

/**
 * 获取人员列表
 */
export const apiGetPersonnelList = (params: any): Promise<any> => {
  return $http.request({
    url: Api.getPersonnelList,
    method: 'GET',
    params,
  })
}

/**
 * 新增人员
 */
export const apiAddPersonnelInfo = (data: any): Promise<any> => {
  return $http.request({
    url: Api.addPersonnelInfo,
    method: 'POST',
    data,
  })
}

/**
 * 编辑人员
 */
export const apiEditPersonnelInfo = (params: any): Promise<any> => {
  return $http.request({
    url: Api.editPersonnelInfo,
    method: 'Post',
    params,
  })
}

/**
 * 删除人员
 */
export const apiDelPersonnel = (data: any): Promise<any> => {
  return $http.request({
    url: Api.delPersonnel,
    method: 'POST',
    data,
  })
}

/**
 * 同步人员信息
 */
export const apiSyncPersonnelInfo = (data: any): Promise<any> => {
  return $http.request({
    url: Api.syncPersonnelInfo,
    method: 'POST',
    data,
  })
}
