import { $http } from '../http/index'

import {
  IGetUserList,
  IModifyUserStatus,
  IAddUser,
  IModifyPassword,
  IGetRoleList,
  IModifyRoleStatus,
  IAddRole,
  IGetMenuList,
  IAddMenuDetail,
  IGetDeptList,
  IAddDept,
  IUpdatePassword,
} from '../types/setting'

enum Api {
  getDepartmentList = '/usermanager/system/dept/treeselect',
  getUserList = '/usermanager/system/user/list',
  modifyUserStatus = '/usermanager/system/user/changeStatus',
  handleUserDetail = '/usermanager/system/user',
  getLoginTypeOptions = '/usermanager/system/logintype/getList',
  updateUser = '/usermanager/system/user/edit',
  modifyPassword = '/usermanager/system/user/resetPwd',
  modifyUserType = '/usermanager/system/user/changeUserType',
  modifyRole = '/usermanager/system/user/authRole',
  exportUser = '/usermanager/system/user/export',
  handleRefuseLogin = '/usermanager/system/user/refuseLogin',

  getRoleList = '/usermanager/system/role/list',
  modifyRoleStatus = '/usermanager/system/role/changeStatus',
  getMenuTree = '/usermanager/system/menu/treeselect',
  getSelectedMenuTree = '/usermanager/system/menu/roleMenuTreeselect',
  getRoleDetail = '/usermanager/system/role',
  updateRoleDetail = '/usermanager/system/role/edit',
  updateRoleAuth = '/usermanager/system/role/dataScope',

  getMenuList = '/usermanager/system/menu/list',
  getMenuDetail = '/usermanager/system/menu',
  updateMenuDetail = '/usermanager/system/menu/edit',

  handleDeptDetail = '/usermanager/system/dept/list',
  delDept = '/usermanager/system/dept',
  getDeptDetail = '/usermanager/system/dept',
  addDateDept = '/usermanager/system/dept',
  updateDept = '/usermanager/system/dept/edit',
  getAreaTreeList = '/usermanager/system/area/getAreaTree',

  getUserInfo = '/usermanager/system/user/profile',
  updatePassword = '/usermanager/system/user/profile/updatePwd',
  killUser = '/usermanager/system/user/profile/cancelled',

  getOperateLogRecord = '/usermanager/monitor/operlog/list',
  getVisitStatisticInfo = '/usermanager/monitor/operlog/getDistribution',
  exportLogs = '/usermanager/monitor/operlog/export',

  getAccessControlIPRecord = '/usermanager/access/control/ip/list',
  deleteAccessControlIP = '/usermanager/access/control/ip/del',
  addAccessControlIP = '/usermanager/access/control/ip/add',
  getAccessControlTimeRecord = '/usermanager/access/control/time/list',
  deleteAccessControlTime = '/usermanager/access/control/time/del',
  addAccessControlTime = '/usermanager/access/control/time/add',
}

// -------------------------------------- 用户管理 -----------------------------------------------

/**
 * @desc: 获取部门树列表
 */
export function apiGetDepartmentList(): Promise<any> {
  return $http.request({
    url: Api.getDepartmentList,
    method: 'GET',
  })
}

/**
 * @desc: 获取用户列表
 */
export function apiGetUserList(params: IGetUserList): Promise<any> {
  return $http.request({
    url: Api.getUserList,
    method: 'GET',
    params,
  })
}

/**
 * @desc: 修改用户状态
 */
export function apiModifyUserStatus(params: IModifyUserStatus): Promise<any> {
  return $http.request({
    url: Api.modifyUserStatus,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 查询用户详情
 */
export function apiGetUserDetail(params: { userId: number | string }): Promise<any> {
  return $http.request({
    url: Api.handleUserDetail + `/${params.userId}`,
    method: 'GET',
    params,
  })
}

/**
 * @desc: 获取登录类型
 */
export function apiGetLoginTypeOptions(): Promise<any> {
  return $http.request({
    url: Api.getLoginTypeOptions,
    method: 'GET',
  })
}

/**
 * @desc: 新增用户信息
 */
export function apiAddUser(params: IAddUser): Promise<any> {
  return $http.request({
    url: Api.handleUserDetail,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 更新用户信息
 */
export function apiUpdateUser(params: IAddUser): Promise<any> {
  return $http.request({
    url: Api.updateUser,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 删除用户
 */
export function apiDeleteUser(params: { userId: number }): Promise<any> {
  return $http.request({
    url: Api.handleUserDetail + `/${params.userId}`,
    method: 'POST',
  })
}

/**
 * @desc 修改密码
 */
export function apiModifyPassword(params: IModifyPassword): Promise<any> {
  return $http.request({
    url: Api.modifyPassword,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc 导出用户
 */
interface IHandleExportUser {
  nickName?: string
  agingType?: string
  status?: string
  loginDate?: string
}
export function apiHandleExportUser(params: IHandleExportUser): Promise<any> {
  return $http.request({
    url: Api.exportUser,
    method: 'GET',
    responseType: 'blob',
    params,
  })
}

// -------------------------------------- 角色管理 -----------------------------------------------

/**
 * @desc 获取角色列表
 */
export function apiGetRoleList(params: IGetRoleList): Promise<any> {
  return $http.request({
    url: Api.getRoleList,
    method: 'GET',
    params,
  })
}

/**
 * @desc 删除角色
 */
export function apiDeleteRole(params: { roleId: number }): Promise<any> {
  return $http.request({
    url: Api.getRoleDetail + `/${params.roleId}`,
    method: 'POST',
  })
}

/**
 * @desc: 修改角色状态
 */
export function apiModifyRoleStatus(params: IModifyRoleStatus): Promise<any> {
  return $http.request({
    url: Api.modifyRoleStatus,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc 获取全部菜单树
 */
export function apiGetMenuTree(): Promise<any> {
  return $http.request({
    url: Api.getMenuTree,
    method: 'GET',
  })
}

/**
 * @desc 获取角色已选择菜单树
 */
export function apiGetSelectedMenuTree(params?: { roleId: number }): Promise<any> {
  const roleId = params?.roleId ? `/${params.roleId}` : ''
  return $http.request({
    url: Api.getSelectedMenuTree + roleId,
    method: 'GET',
  })
}

/**
 * @desc 获取角色详情
 */
export function apiGetRoleDetail(params: { roleId: number }): Promise<any> {
  return $http.request({
    url: Api.getRoleDetail + `/${params.roleId}`,
    method: 'GET',
  })
}

/**
 * @desc 新增角色
 */
export function apiAddRole(params: IAddRole): Promise<any> {
  return $http.request({
    url: Api.getRoleDetail,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc 更新角色信息
 */
export function apiUpdateRole(params: IAddRole): Promise<any> {
  return $http.request({
    url: Api.updateRoleDetail,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc 分配角色权限
 */
export function apiUpdateRoleAuth(params: IAddRole): Promise<any> {
  return $http.request({
    url: Api.updateRoleAuth,
    method: 'POST',
    data: params,
  })
}

// -------------------------------------- 菜单管理 -----------------------------------------------

/**
 * @desc 获取菜单列表
 */
export function apiGetMenuList(params: IGetMenuList): Promise<any> {
  return $http.request({
    url: Api.getMenuList,
    method: 'GET',
    params,
  })
}

/**
 * @desc 删除菜单列表
 */
export function apiDelMenuList(params: { menuId: number }): Promise<any> {
  return $http.request({
    url: Api.getMenuDetail + `/${params.menuId}`,
    method: 'POST',
  })
}

/**
 * @desc 获取菜单详情
 */
export function apiGetMenuDetail(params: { menuId: number }): Promise<any> {
  return $http.request({
    url: Api.getMenuDetail + `/${params.menuId}`,
    method: 'GET',
  })
}

/**
 * @desc 添加菜单详情
 */
export function apiAddMenuDetail(params: IAddMenuDetail): Promise<any> {
  return $http.request({
    url: Api.getMenuDetail,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc 更新菜单详情
 */
export function apiUpdateMenuDetail(params: IAddMenuDetail): Promise<any> {
  return $http.request({
    url: Api.updateMenuDetail,
    method: 'POST',
    data: params,
  })
}

// -------------------------------------- 部门管理 -----------------------------------------------

/**
 * @desc 获取角色列表
 */
export function apiGetDeptList(params: IGetDeptList): Promise<any> {
  return $http.request({
    url: Api.handleDeptDetail,
    method: 'GET',
    params,
  })
}

/**
 * @desc 删除部门
 */
export function apiDeleteDept(params: { deptId: number }): Promise<any> {
  return $http.request({
    url: Api.delDept + `/${params.deptId}`,
    method: 'POST',
  })
}

/**
 * @desc 获取部门详情
 */
export function apiGetDeptDetail(params: { deptId: number }): Promise<any> {
  return $http.request({
    url: Api.getDeptDetail + `/${params.deptId}`,
    method: 'GET',
  })
}

/**
 * @desc 新增部门
 */
export function apiAddDept(params: IAddDept): Promise<any> {
  return $http.request({
    url: Api.addDateDept,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc 更新部门
 */
export function apiUpdateDept(params: IAddDept): Promise<any> {
  return $http.request({
    url: Api.updateDept,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc 获取行政区划
 */
export function apiGetAreaTreeList(): Promise<any> {
  return $http.request({
    url: Api.getAreaTreeList,
    method: 'GET',
  })
}

// -------------------------------------- 用户中心 -----------------------------------------------

/**
 * @desc 获取用户信息
 */
export function apiGetUserInfo(): Promise<any> {
  return $http.request({
    url: Api.getUserInfo,
    method: 'GET',
  })
}

/**
 * @desc 更新密码
 */
export function apiUpdatePassword(params: IUpdatePassword): Promise<any> {
  return $http.request({
    url: Api.updatePassword,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc 注销用户
 */
export function apiKillUser(params: { password: string }): Promise<any> {
  return $http.request({
    url: Api.killUser,
    method: 'POST',
    data: params,
  })
}

// -------------------------------------- 操作日志 -----------------------------------------------

/**
 * @desc 操作日志列表
 */
export function apiGetOperateLogRecord(params: any): Promise<any> {
  return $http.request({
    url: Api.getOperateLogRecord,
    method: 'GET',
    params,
  })
}

/**
 * @desc 获取访问统计
 */
export function apiGetVisitStatisticInfo(params: { daysFromToday: number }): Promise<any> {
  return $http.request({
    url: Api.getVisitStatisticInfo,
    method: 'GET',
    params,
  })
}

/**
 * @desc 导出日志
 */
export function apiExportLogs(): Promise<any> {
  return $http.request({
    url: Api.exportLogs,
    method: 'GET',
    responseType: 'blob',
  })
}

//-------------------------------------- 访问控制 ------------------------------------------------

/**
 * @desc 访问控制IP列表
 */
export function apiGetAccessControlIPRecord(params: any): Promise<any> {
  return $http.request({
    url: Api.getAccessControlIPRecord,
    method: 'GET',
    params,
  })
}

/**
 * @desc 删除访问控制IP
 */
export function apiDeleteAccessControlIP(params: any): Promise<any> {
  return $http.request({
    url: Api.deleteAccessControlIP + `/${params.id}`,
    method: 'POST',
  })
}

/**
 * @desc 新增访问控制IP
 */
export function apiAddAccessControlIP(params: any): Promise<any> {
  return $http.request({
    url: Api.addAccessControlIP,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc 访问控制时间列表
 */
export function apiGetAccessControlTimeRecord(params: any): Promise<any> {
  return $http.request({
    url: Api.getAccessControlTimeRecord,
    method: 'GET',
    params,
  })
}

/**
 * @desc 删除访问控制时间
 */
export function apiDeleteAccessControlTime(params: any): Promise<any> {
  return $http.request({
    url: Api.deleteAccessControlTime + `/${params.id}`,
    method: 'POST',
  })
}

/**
 * @desc 新增访问控制时间
 */
export function apiAddAccessControlTime(params: any): Promise<any> {
  return $http.request({
    url: Api.addAccessControlTime,
    method: 'POST',
    data: params,
  })
}
