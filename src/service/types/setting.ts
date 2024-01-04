// -------------------------------------- 用户管理 -----------------------------------------------

/**
 * @description: 获取用户列表
 */
export interface IGetUserList {
  pageNum: number
  pageSize: number
  deptId?: number
}

/**
 * @desc 修改用户状态
 */
export interface IModifyUserStatus {
  status: string
  userId: number
}

/**
 * @desc 新增用户信息
 * @param nickName 用户昵称
 * @param deptId 所属部门
 * @param phonenumber 手机号码
 * @param email 邮箱
 * @param userName 用户名称
 * @param password 用户密码
 * @param sex 用户性别
 * @param status 用户状态
 * @param roleIds 角色
 * @param remark 备注
 */
export interface IAddUser {
  userId?: number
  nickName: string
  deptId: Object
  phonenumber: string
  email: string
  userName?: string
  password?: string
  sex: string | null
  status: string
  roleIds: number[]
  remark: string
  agingType: string | null
  expiration?: string
}

/**
 * @desc 修改用户密码
 */
export interface IModifyPassword {
  password: string
  userId: number
}

// -------------------------------------- 角色管理 -----------------------------------------------

/**
 * @description: 获取角色列表
 */
export interface IGetRoleList {
  pageNum: number
  pageSize: number
}

/**
 * @desc 修改用户状态
 */
export interface IModifyRoleStatus {
  status: string
  roleId: number
}

/**
 * @desc 添加角色
 */
export interface IAddRole {
  menuCheckStrictly: boolean // 数据树是否父子联动
  menuIds: number[] // 角色权限菜单Id
  remark: string // 备注
  roleKey: string // 权限字符
  roleName: string // 角色名称
  roleSort: number // 角色顺序
  status: string // 状态
}

// -------------------------------------- 菜单管理 -----------------------------------------------

/**
 * @description: 获取菜单列表
 */
export interface IGetMenuList {
  pageNum: number
  pageSize: number
}

/**
 * @description: 获取菜单列表
 */
export interface IAddMenuDetail {
  menuId?: number
  parentId: number
  menuType: string
  icon: string
  menuName: string
  orderNum: number
  isFrame: string
  path: string
  visible: string
  status: string
  isCache: string
}

// -------------------------------------- 部门管理 -----------------------------------------------

/**
 * @description: 获取部门列表
 */
export interface IGetDeptList {
  pageNum: number
  pageSize: number
}

/**
 * @description: 添加部门
 */
export interface IAddDept {
  deptId?: number | string
  deptName: string
  email?: string
  leader?: string
  orderNum?: number
  parentId: number | string
  phone: string
  status?: string
  remark?: string
}

// -------------------------------------- 用户中心 -----------------------------------------------

/**
 * @description: 更新密码
 */
export interface IUpdatePassword {
  oldPassword: string
  newPassword: string
}
