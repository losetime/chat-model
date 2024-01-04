import { $http } from '../http/index'

import { SubmitLoginInterface, IForceUpdatePassword } from '../types/login'

enum Api {
  getCodeImage = '/usermanager/captchaImage',
  submitLogin = '/usermanager/login',
  getUserInfo = '/usermanager/getInfo',
  signOut = '/usermanager/logout',
  forceUpdatePassword = '/usermanager/forceUpdatePwd',
}

/**
 * @desc: 获取验证码
 */
export function apiGetCodeImage(): Promise<any> {
  return $http.request({
    url: Api.getCodeImage,
    method: 'GET',
  })
}

/**
 * @desc: 登录
 */
export function apiSubmitLogin(params: SubmitLoginInterface): Promise<any> {
  return $http.request({
    url: Api.submitLogin,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 获取用户信息
 */
export function apiGetUserInfo(): Promise<any> {
  return $http.request({
    url: Api.getUserInfo,
    method: 'GET',
  })
}

/**
 * @desc: 退出
 */
export function apiSignOut(): Promise<any> {
  return $http.request({
    url: Api.signOut,
    method: 'POST',
  })
}

/**
 * @desc: 新用户强制更新密码
 */
export function apiForceUpdatePassword(params: IForceUpdatePassword): Promise<any> {
  return $http.request({
    url: Api.forceUpdatePassword,
    method: 'POST',
    data: params,
  })
}
