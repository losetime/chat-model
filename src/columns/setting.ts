import { ref } from 'vue'
import {
  AccountType,
  AccountStatus,
  IncidentTypeOptions,
  OperateLogAbnormalOptions,
  BusinessTypeOptions,
} from '@/enums/settingEnum'
import { handleCustomRenderColumn } from '@/utils/base'

// -------------------------------------- 系统设置 -----------------------------------------------

// 用户管理
export const userColumns = (loginTypeOptions: any[]): any => {
  return [
    {
      title: '用户编号',
      key: 'userName',
      dataIndex: 'userName',
      resizable: true,
      width: 140,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '姓名',
      key: 'nickName',
      dataIndex: 'nickName',
      resizable: true,
      width: 120,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '所属部门',
      key: 'deptName',
      customRender: ({ record }: { record: any }) => record.dept.deptName,
      resizable: true,
      width: 120,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '人员类型',
      key: 'userType',
      customRender: ({ record }: { record: any }) => (record.userType === 'PLATFORM_ADMIN' ? '管理员' : '普通员工'),
      resizable: true,
      width: 120,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '数据来源',
      key: 'dataOrigin',
      customRender: ({ record }: { record: any }) => {
        switch (record.dataOrigin) {
          case 'RISK_CONTROL':
            return '风控'
          case 'OWN':
            return '自有'
          default:
            return '--'
        }
      },
      resizable: true,
      width: 100,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '联系电话',
      key: 'phonenumber',
      dataIndex: 'phonenumber',
      resizable: true,
      width: 100,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '账号类别',
      key: 'agingType',
      customRender: ({ record }: { record: any }) => handleCustomRenderColumn(AccountType, record.agingType),
      resizable: true,
      width: 100,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '账号状态',
      key: 'status',
      customRender: ({ record }: { record: any }) => handleCustomRenderColumn(AccountStatus, record.status),
      resizable: true,
      width: 100,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '最后登录时间',
      key: 'loginDate',
      dataIndex: 'loginDate',
      resizable: true,
      width: 160,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '登录类型',
      key: 'loginTypes',
      customRender: ({ record }: { record: any }) => {
        const tempArr = record.loginTypes.map((item: any) => {
          const findItem = loginTypeOptions.find((val: any) => val.value === item)
          return findItem.label
        })
        return tempArr.join('，')
      },
      resizable: true,
      width: 160,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 160,
    },
  ]
}

// 角色管理
export const roleColumns = [
  {
    title: '角色编号',
    dataIndex: 'roleId',
    key: 'roleId',
  },
  {
    title: '角色名称',
    key: 'roleName',
    dataIndex: 'roleName',
  },
  {
    title: '权限字符',
    key: 'roleKey',
    dataIndex: 'roleKey',
  },
  {
    title: '显示顺序',
    key: 'roleSort',
    dataIndex: 'roleSort',
  },
  {
    title: '状态',
    key: 'slotOne',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 菜单管理
export const menuColumns = [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    key: 'menuName',
  },
  {
    title: '图标',
    key: 'icon',
    dataIndex: 'icon',
    width: 180,
  },
  {
    title: '排序',
    key: 'orderNum',
    dataIndex: 'orderNum',
    width: 80,
  },
  {
    title: '权限标识',
    key: 'perms',
    dataIndex: 'perms',
    width: 100,
  },
  {
    title: '组件路径',
    key: 'component',
    dataIndex: 'component',
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 部门管理
export const deptColumns = [
  {
    title: '部门名称',
    dataIndex: 'deptName',
    key: 'deptName',
  },
  {
    title: '排序',
    key: 'orderNum',
    dataIndex: 'orderNum',
  },
  {
    title: '状态',
    key: 'status',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 操作日志
export const operateLogColumn = ref([
  {
    title: '操作人',
    key: 'operName',
    dataIndex: 'operName',
    resizable: true,
    width: 140,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '事件类型',
    key: 'logEventType',
    customRender: ({ record }: { record: any }) => handleCustomRenderColumn(IncidentTypeOptions, record.logEventType),
    resizable: true,
    width: 120,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作菜单',
    key: 'title',
    dataIndex: 'title',
    resizable: true,
    width: 200,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '请求方法',
    key: 'requestMethod',
    dataIndex: 'requestMethod',
    resizable: true,
    width: 200,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '业务类型',
    key: 'businessType',
    customRender: ({ record }: { record: any }) => handleCustomRenderColumn(BusinessTypeOptions, record.businessType),
    resizable: true,
    width: 200,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '是否异常',
    key: 'status',
    customRender: ({ record }: { record: any }) => handleCustomRenderColumn(OperateLogAbnormalOptions, record.status),
    resizable: true,
    width: 200,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作时间',
    key: 'operTime',
    dataIndex: 'operTime',
    resizable: true,
    width: 160,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作IP',
    key: 'operIp',
    dataIndex: 'operIp',
    resizable: true,
    width: 160,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
])

// 限制访问时间
export const accessControlTimeColumn = ref([
  { title: '序号', key: 'serialNumber', width: 60, align: 'center' },
  {
    title: '限制访问时间',
    key: 'accessControlTime',
    customRender: ({ record }: { record: any }) => record.startTime + ' - ' + record.endTime,
    resizable: true,
    width: 600,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    resizable: true,
    width: 400,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
])

// 限制访问IP
export const accessControlIPColumn = ref([
  { title: '序号', key: 'serialNumber', width: 60, align: 'center' },
  {
    title: '限制访问IP',
    key: 'ip',
    dataIndex: 'ip',
    resizable: true,
    width: 600,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    resizable: true,
    width: 400,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
])
