import { $http } from '@/service/http/index'

/**
 * 获取搜救终端列表
 */
export const apiGetRescuePadList = (params: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'get',
    params,
  })

/**
 * 新增搜救终端
 */
export const apiAddRescuePad = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 编辑搜救终端
 */
export const apiEditRescuePad = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })

/**
 * 删除搜救终端
 */
export const apiDelRescuePad = (data: any): Promise<any> =>
  $http.request({
    url: '',
    method: 'POST',
    data,
  })
