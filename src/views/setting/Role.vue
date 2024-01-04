<template>
  <div>
    <CommonMangerPage>
      <template #handle>
        <a-space>
          <a-button type="primary" @click="handleAdd" v-permission="{ key: 'system:role:add' }">新增</a-button>
        </a-space>
      </template>
      <template #table>
        <ym-table
          rowKey="roleId"
          :columns="roleColumns"
          :getTableList="getRoleList"
          :rowSelection="false"
          ref="tableInstance"
        >
          <template #slotOne="{ record }">
            <a-switch
              :checked="record.status"
              checked-children="启用"
              un-checked-children="停用"
              checkedValue="0"
              unCheckedValue="1"
              :disabled="handleIsManage(record.roleKey)"
              @change="(checked: any) => changeUserStatus(checked, record)"
            />
          </template>
          <template #action="{ record }">
            <a-space v-if="!handleIsManage(record.roleKey)">
              <a-button type="link" size="small" @click="handleEdit(record)" v-permission="{ key: 'system:role:edit' }">
                修改
              </a-button>
              <!-- <a-button type="link" size="small" @click="handleAllotionAuthority(record)">分配权限</a-button> -->
              <a-button
                type="link"
                size="small"
                danger
                @click="handleDel(record.roleId)"
                v-permission="{ key: 'system:role:remove' }"
              >
                删除
              </a-button>
            </a-space>
          </template>
        </ym-table>
      </template>
    </CommonMangerPage>
    <role-detail ref="detailInstance" :getSourceData="getSourceData" :handleRefresh="handleRefresh" />
    <role-auth ref="authInstance" :getSourceData="getSourceData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommonMangerPage from '@/components/common/CommonMangerPage.vue'
import YmTable from '@/components/common/YmTable.vue'
import RoleDetail from '@/components/setting/RoleDetail.vue'
import RoleAuth from '@/components/setting/RoleAuth.vue'
import { apiGetRoleList, apiDeleteRole, apiModifyRoleStatus } from '@/service/api/setting'
import { roleColumns } from '@/columns/setting'
import { actionTypeEnum } from '@/enums/commonEnum'
import { message } from 'ant-design-vue'
import { YmModal } from '@/utils/antd'

/**
 ********************************* 表格逻辑 ******************************************
 */

// 表格实例
const tableInstance = ref()

/**
 * @desc 重新获取当前页列表
 */
const getSourceData = () => {
  tableInstance.value.getSourceData()
}

/**
 * @desc 列表刷新
 */
const handleRefresh = () => {
  tableInstance.value.handleRefresh()
}

/**
 * @desc 获取用户列表
 */
const getRoleList = async () => {
  const { current, size } = tableInstance.value.reqParams
  const { code, rows, total } = await apiGetRoleList({
    pageSize: size,
    pageNum: current,
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
const handleDel = (roleId: number) => {
  YmModal.delete(async () => {
    const { code } = await apiDeleteRole({ roleId })
    if (code === 20000) {
      message.success('删除成功')
      getSourceData()
    }
  })
}

/**
 * @desc 修改用户状态
 */
const changeUserStatus = async (checked: string, record: any) => {
  const { roleId } = record
  const { code } = await apiModifyRoleStatus({ status: checked, roleId })
  if (code === 20000) {
    message.success(checked === '0' ? '已启用' : '已停用')
    getSourceData()
  }
}

const detailInstance = ref()

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
  detailInstance.value.initModal(actionTypeEnum.EDIT, { roleId: record.roleId })
}

const authInstance = ref<any>(null)

// /**
//  * @desc 分配权限
//  */
// const handleAllotionAuthority = (record: any) => {
//   authInstance.value.initModal(record)
// }

const handleIsManage = (key: string) => {
  const manageKey = ['admin', 'audit_admin', 'business_admin']
  return manageKey.includes(key)
}
</script>

<style lang="less" scoped></style>
