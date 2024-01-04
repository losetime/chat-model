// 账号类别
export const AccountType = [
  {
    label: '长期账号',
    value: 'LongTime',
  },
  {
    label: '临时账号',
    value: 'ShortTime',
  },
]

// 临时账号使用时间
export const temporaryUserUseTimeOptions = [
  {
    label: '7天',
    value: 'SEVEN_DAYS',
  },
  {
    label: '30天',
    value: 'ONE_MONTH',
  },
  {
    label: '半年',
    value: 'HALF_YEAR',
  },
]

// 账号状态
export const AccountStatus = [
  {
    label: '激活',
    value: '0',
  },
  {
    label: '停用',
    value: '1',
  },
  {
    label: '已注销',
    value: '3',
  },
  {
    label: '休眠',
    value: '4',
  },
]

// 最后登录时间
export const LoginDateOptions = [
  {
    label: '大于30天',
    value: '0',
  },
  {
    label: '大于6个月',
    value: '1',
  },
  {
    label: '大于12个月',
    value: '2',
  },
]

export const RefuseTimeOptions = [
  {
    label: '7天',
    value: '1',
  },
  {
    label: '30天',
    value: '2',
  },
  {
    label: '半年',
    value: '3',
  },
]

// 事件类型
export const IncidentTypeOptions = [
  {
    label: '系统事件',
    value: 0,
  },
  {
    label: '业务事件',
    value: 1,
  },
]

// 是否异常
export const OperateLogAbnormalOptions = [
  {
    label: '是',
    value: 1,
  },
  {
    label: '否',
    value: 0,
  },
]

// 业务类型
export const BusinessTypeOptions = [
  {
    label: '其它',
    value: 0,
  },
  {
    label: '新增',
    value: 1,
  },
  {
    label: '修改',
    value: 2,
  },
  {
    label: '删除',
    value: 3,
  },
  {
    label: '授权',
    value: 4,
  },
  {
    label: '导出',
    value: 5,
  },
  {
    label: '导入',
    value: 6,
  },
  {
    label: '强退',
    value: 7,
  },
  {
    label: '生成代码',
    value: 8,
  },
  {
    label: '清空数据',
    value: 9,
  },
  {
    label: '登录',
    value: 10,
  },
]
