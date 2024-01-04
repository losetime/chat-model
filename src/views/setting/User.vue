<template>
  <div class="user-wrapper">
    <div class="department-tree-wrap">
      <ym-tree
        :tree-data="treeList"
        :field-names="fieldNames"
        :custom-title="true"
        @select="onSelectNode"
        @search="onSearchTree"
      >
        <template #title="{ record }">
          <span v-if="record.label.indexOf(searchVal) > -1">
            <span>{{ record.label.substr(0, record.label.indexOf(searchVal)) }}</span>
            <span style="color: #ff7875">{{ searchVal }}</span>
            <span>{{ record.label.substr(record.label.indexOf(searchVal) + searchVal.length) }}</span>
          </span>
          <span v-else>{{ record.label }}</span>
        </template>
      </ym-tree>
    </div>
    <div class="user-list-wrap">
      <CommonMangerPage>
        <template #search>
          <Search>
            <template #searchItems>
              <a-form layout="inline" :model="searchParams">
                <a-form-item label="姓名">
                  <a-input v-model:value="searchParams.nickName" placeholder="请输入姓名" />
                </a-form-item>
                <a-form-item label="账号类别">
                  <a-select
                    v-model:value="searchParams.agingType"
                    placeholder="请选择账号类别"
                    allowClear
                    :options="AccountType"
                  />
                </a-form-item>
                <a-form-item label="账号状态">
                  <a-select
                    v-model:value="searchParams.status"
                    placeholder="请选择账号状态"
                    allowClear
                    :options="AccountStatus"
                  />
                </a-form-item>
                <a-form-item label="最后登录时间">
                  <a-select
                    v-model:value="searchParams.loginDate"
                    placeholder="请选择最后登录时间"
                    allowClear
                    :options="LoginDateOptions"
                  />
                </a-form-item>
                <a-form-item>
                  <a-space>
                    <a-button type="primary" @click="handleReacquire(1)">查询</a-button>
                    <a-button @click="handleResetSearch">重置</a-button>
                  </a-space>
                </a-form-item>
              </a-form>
            </template>
          </Search>
        </template>
        <template #handle>
          <a-space>
            <a-button type="primary" @click="handleAdd" v-permission="{ key: 'system:user:add' }">新增</a-button>
            <a-button type="primary" @click="handleExport" v-permission="{ key: 'system:user:export' }">导出</a-button>
          </a-space>
        </template>
        <template #table>
          <ym-table
            rowKey="userId"
            :columns="userColumns(loginTypeOptions)"
            :getTableList="getUserList"
            :isImmediately="false"
            :row-selection="false"
            table-x="max-content"
            ref="tableInstance"
          >
            <template #action="{ record }">
              <a-space v-if="!handleIsManage(record.roles)">
                <a-button
                  type="link"
                  size="small"
                  @click="handleEdit(record)"
                  v-permission="{ key: 'system:user:edit' }"
                  >修改</a-button
                >
                <a-button
                  type="link"
                  size="small"
                  v-if="record.userType === 'PLATFORM_ADMIN'"
                  @click="handleResetPassword(record)"
                  v-permission="{ key: 'system:user:resetPwd' }"
                  >重置密码</a-button
                >
                <a-button
                  type="link"
                  size="small"
                  danger
                  @click="handleDel(record.userId)"
                  v-permission="{ key: 'system:user:remove' }"
                  >删除</a-button
                >
              </a-space>
            </template>
          </ym-table>
        </template>
      </CommonMangerPage>
    </div>
    <user-detail ref="detailInstance" :getSourceData="getSourceData" :handleRefresh="handleRefresh" />
    <modify-password ref="passwordInstance" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import YmTree from '@/components/common/YmTree.vue'
import UserDetail from '@/components/setting/UserDetail.vue'
import ModifyPassword from '@/components/setting/ModifyPassword.vue'
import {
  apiGetDepartmentList,
  apiGetUserList,
  apiDeleteUser,
  apiHandleExportUser,
  apiGetLoginTypeOptions,
} from '@/service/api/setting'
import { userColumns } from '@/columns/setting'
import { actionTypeEnum } from '@/enums/commonEnum'
import { message } from 'ant-design-vue'
import { YmModal } from '@/utils/antd'
import { AccountType, AccountStatus, LoginDateOptions } from '@/enums/settingEnum'
import { dateUtil } from '@/utils/dateUtil'
import CommonMangerPage from '@/components/common/CommonMangerPage.vue'
import Search from '@/components/common/Search.vue'

onMounted(async () => {
  await getLoginTypeOptions()
  await getDepartmentList()
})

/**
 ********************************* 部门树逻辑 ******************************************
 */

const treeList = ref([])

const fieldNames = ref({
  title: 'label',
  key: 'id',
})

const searchVal = ref('')

const onSelectNode = (keys: number[]) => {
  if (keys.length > 0) {
    deptId.value = keys[0]
    handleRefresh()
  }
}

const onSearchTree = (val: string) => {
  searchVal.value = val
}

/**
 * @desc 获取部门列表
 */
const getDepartmentList = async () => {
  const { code, data } = await apiGetDepartmentList()
  if (code === 20000) {
    treeList.value = data
    deptId.value = data[0].id
    tableInstance.value.getSourceData()
  }
}

/**
 ********************************* 表格逻辑 ******************************************
 */

// 表格实例
const tableInstance = ref()

// 用户详情实例
const detailInstance = ref()

const deptId = ref(-1)

// 搜索参数
const searchParams = reactive<any>({
  nickName: '',
  agingType: null,
  status: null,
  loginDate: null,
})

// 重新获取列表
const handleReacquire = (page?: number) => {
  tableInstance.value.handleReacquire(page)
}

const handleResetSearch = () => {
  Object.assign(searchParams, {
    nickName: '',
    agingType: null,
    status: null,
    loginDate: null,
  })
  handleReacquire(1)
}

/**
 * @desc 列表刷新
 */
const handleRefresh = () => {
  tableInstance.value.handleRefresh()
}

/**
 * @desc 重新获取当前页列表
 */
const getSourceData = () => {
  tableInstance.value.getSourceData()
}

/**
 * @desc 获取用户列表
 */
const getUserList = async () => {
  const { current, size } = tableInstance.value.reqParams
  const { loginDate, ...args } = searchParams
  let tempLoginDate = ''
  switch (loginDate) {
    case '0':
      tempLoginDate = dateUtil().subtract(30, 'day').format('YYYY-MM-DD HH:mm:ss')
      break
    case '1':
      tempLoginDate = dateUtil().subtract(6, 'month').format('YYYY-MM-DD HH:mm:ss')
      break
    case '2':
      tempLoginDate = dateUtil().subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss')
      break
  }
  const { code, rows, total } = await apiGetUserList({
    deptId: deptId.value,
    pageSize: size,
    pageNum: current,
    ...args,
    loginDate: tempLoginDate,
  })
  return Promise.resolve({
    code,
    data: {
      records: rows,
      total,
    },
  })
}

/**
 * @desc 列表删除
 */
const handleDel = (userId: number) => {
  YmModal.delete(async () => {
    const { code } = await apiDeleteUser({ userId })
    if (code === 20000) {
      message.success('删除成功')
      tableInstance.value.getSourceData()
    }
  })
}

const loginTypeOptions = ref<any>([])

/**
 * @desc 获取登录类型
 */
const getLoginTypeOptions = async () => {
  const { code, data } = await apiGetLoginTypeOptions()
  if (code === 20000) {
    loginTypeOptions.value = data.types.map((item: any) => ({ label: item.desc, value: item.type }))
  }
}

/**
 * @desc 新增
 */
const handleAdd = () => {
  detailInstance.value.initModal(actionTypeEnum.ADD)
}

/**
 * @desc 编辑
 */
const handleEdit = (record: any) => {
  detailInstance.value.initModal(actionTypeEnum.EDIT, record)
}

/**
 * @desc 导出
 */
const handleExport = () => {
  apiHandleExportUser(searchParams)
}

// 修改密码实例
const passwordInstance = ref()

/**
 * @desc 重置
 */
const handleResetPassword = (record: any) => {
  passwordInstance.value.initModal({ userId: record.userId })
}

/**
 * @desc 是否是管理员
 */
const handleIsManage = (roles: any[]) => {
  if (roles.length > 0) {
    const roleKey: string = roles[0].roleKey
    const manageKey = ['admin', 'audit_admin', 'business_admin']
    return manageKey.includes(roleKey)
  } else {
    return false
  }
}
</script>

<style lang="less" scoped>
.user-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .department-tree-wrap {
    width: 300px;
    padding: 14px;
    margin-right: 14px;
    background-color: #ffffff;
  }
  .user-list-wrap {
    flex: 1;
    .search-wrapper {
      ::v-deep(.ant-form) {
        .ant-form-item-label {
          min-width: 100px;
        }
      }
    }

    .handle-wrap {
      padding: 32px 32px 0 32px;
      background-color: #ffffff;
      margin-top: 14px;
    }
    .custom-table-wrap {
      height: calc(100% - 228px);
      padding: 32px;
      background-color: #ffffff;
      position: relative;
    }
  }
}
</style>
