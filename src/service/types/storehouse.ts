import { IPaging } from './common'

// -------------------------------------- 库存管理 -----------------------------------------------

/**
 * @description: 获取入库列表
 */
export interface IGetWarehousingList extends IPaging {
  name?: string
  toolTypeId?: number
  bidCode: string
}

/**
 * @description: 新增/编辑入库列表
 */
export interface ISaveWarehousing {
  name: string
  tag: string
  storeId: string
  toolTypeId: string
  lastInspect: string
  model: string
  manufacturer: string
  codeNumber: string
  id?: string
  bidNo: string
}

// -------------------------------------- 器具使用 -----------------------------------------------

/**
 * @description: 获取器具领用列表
 */
export interface IGetToolsReceiveList extends IPaging {
  bidCode: string
  recipientName?: string
  epc?: string
  receiveTimeStart?: string
  receiveTimeEnd?: string
  toolTag?: string
  returnStatus?: string
}

// -------------------------------------- 信息管理 -----------------------------------------------

/**
 * @description: 获取仓库列表
 */
export interface IGetRepositoryList extends IPaging {
  name?: string
  status?: number
  bidCode: string
}

/**
 * @description: 新增/更新仓库
 */
export interface ISaveRepository {
  bidNo: string
  id?: string
  codeNum: string
  name: string
}

/**
 * @description: 新增/更新仓位
 */
export interface ISaveFreightSpace {
  bidNo: string
  name: string
  houseId: string
  models: string
  id?: string
}

/**
 * @desc 获取标签列表
 */
export interface IGetTagsList extends IPaging {
  bidCode: string
  toolTag?: string // 分类
  toolType?: string // 名称
  model?: string // 型号
  checkStatus?: string // 检查状态 1待检 2已脱检
  libraryStatus?: string // 在库状态 0已出库 1在库
  nearCheckDays?: string // 临检天数
  other?: string // epcWriteList 标签写入列表 accountList 台账列表、检验周期提醒列表
}

/**
 * @desc 新增/更新标签
 */
export interface ISaveTag {
  id: string
  toolTag: string
  model: string
  meter: string
  manufactureDate: string
  inspectStart: string
  inspectEnd: string
  toolType: string
  epc: string
  manufacturer: string
  buyDate: string
}

/**
 * @desc 生成FRID
 */
export interface IGenerateFRID {
  model: string
  tag: string
  type: string
}

/**
 * @desc 获取仓位列表
 */
export interface IGetToolShippingSpaceRecord extends IPaging {
  bidCode: string
  existRate?: number | string
  houseId?: string
  name?: string
  status?: string
  toolTypeId?: string
}

/**
 * @desc 获取视频分页
 */
export interface IGetVideoCollectRecord extends IPaging {
  length?: string
  num?: string
  status?: boolean
  videoTime?: string
}

/**
 * @desc 获取工器具详情列表
 */
export interface IGetToolDetailRecord {
  companyCode: string
  model: string
  tag: string
  type: string
}

/**
 * @desc 获取仪表盘数据
 */
export interface IGetDashboardData {
  bidNo: string
  type: string
  day?: string
  startTime?: string
  endTime?: string
}
