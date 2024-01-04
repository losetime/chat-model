/**
 * @description: 登录
 */
export interface SubmitLoginInterface {
  code: string
  password: string
  username: string
  uuid: string
  loginType: string
}

/**
 * @desc 强制更新密码
 */
export interface IForceUpdatePassword {
  code: string
  uuid: string
  newPassword: string
  oldPassword: string
  username: string
}
