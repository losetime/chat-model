import { $http } from '../http'

enum Api {
  getRoutersInfo = '/usermanager/getRouters',
  getDicts = '/person/cea/sysdict/getDict',
  getDictChildren = '/person/cea/sysdict/getChildren',
  getProjectSection = '/person/cea/bid/getAllBid',
  getUserDicts = '/usermanager/system/dict/data/type',
  getPublicKey = '/usermanager/api/security/rsa',
}

/**
 * @desc: 获取路由信息
 */
export function apiGetRoutersInfo(): Promise<any> {
  return $http.request({
    url: Api.getRoutersInfo,
    method: 'GET',
    headers: {
      ignoreCancelToken: true,
    },
  })
}

/**
 * @description: 获取后端字典
 */
export function apiGetDicts(params: { types: string }): Promise<any> {
  return $http.request({
    url: Api.getDicts,
    method: 'GET',
    params,
    headers: {
      ignoreCancelToken: true, // 忽略关闭重复请求
    },
  })
}

/**
 * @description: 获取后端联级字典
 */
export function apiGetDictChildren(params: { type: string; value: string }): Promise<any> {
  return $http.request({
    url: Api.getDictChildren,
    method: 'GET',
    params,
    headers: {
      ignoreCancelToken: true, // 忽略关闭重复请求
    },
  })
}

/**
 * @description: 获取用户管理字典
 */
export function apiGetUserDicts(params: { typeKey: string }): Promise<any> {
  return $http.request({
    url: Api.getUserDicts + `/${params.typeKey}`,
    method: 'GET',
  })
}

/**
 * @description: 获取所有标段
 */
export function apiGetProjectSection(params?: { bidName: string }): Promise<any> {
  return $http.request({
    url: Api.getProjectSection,
    method: 'GET',
    params,
  })
}

/**
 * @desc 获取RSA公钥和随机串
 */
export function apiGetPublicKey(): Promise<any> {
  return $http.request({
    url: Api.getPublicKey,
    method: 'GET',
  })
}
