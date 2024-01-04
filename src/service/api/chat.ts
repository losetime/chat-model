import { $http } from '../http'

enum Api {
  getAccessToken = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=TbQPAn2FoO57ghRBqAalG2oA&client_secret=1fg8kggxA4XSvlNr5tlOfwyI2KBQ3PCw',
}

/**
 * 获取设备列表
 */
export const apiGetAccessToken = (): Promise<any> => {
  return $http.request({
    url: Api.getAccessToken,
    method: 'POST',
  })
}
