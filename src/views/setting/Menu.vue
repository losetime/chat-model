<template>
  <div>
    <CommonMangerPage>
      <template #handle>
        <a-space>
          <a-button type="primary" @click="handleAdd">新增</a-button>
        </a-space>
        <a-space />
      </template>
      <template #table>
        <ym-table
          rowKey="menuId"
          :columns="menuColumns"
          :getTableList="getDeptList"
          :rowSelection="false"
          ref="tableInstance"
        >
          <template #status="{ record }">{{ parseDicts(record.status) }}</template>
          <template #action="{ record }">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">修改</a-button>
              <a-button type="link" size="small" danger @click="handleDel(record.menuId)">删除</a-button>
            </a-space>
          </template>
        </ym-table>
      </template>
    </CommonMangerPage>
    <menu-detail ref="detailInstance" :getSourceData="getSourceData" :handleRefresh="handleRefresh" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import MenuDetail from '@/components/setting/MenuDetail.vue'
import { apiGetMenuList, apiDelMenuList } from '@/service/api/setting'
import { apiGetUserDicts } from '@/service/api/common'
import { menuColumns } from '@/columns/setting'
import { actionTypeEnum } from '@/enums/commonEnum'
import { message } from 'ant-design-vue'
import { YmModal } from '@/utils/antd'
import CommonMangerPage from '@/components/common/CommonMangerPage.vue'

onBeforeMount(() => {
  getDicts()
})

/**
 ********************************* 表格逻辑 ******************************************
 */

// 表格实例
const tableInstance = ref()

// 详情实例
const detailInstance = ref()

// 部门状态
const statusOptions = ref<any>([])

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
 * @desc 获取菜单列表
 */
const getDeptList = async () => {
  const { current, size } = tableInstance.value.reqParams
  const { code, data } = await apiGetMenuList({
    pageSize: size,
    pageNum: current,
  })
  return Promise.resolve({
    code,
    data: {
      records: arrayToTree(data, data[0].parentId),
    },
  })
}

/**
 * @desc 一维数组转为树结构
 */
const arrayToTree = (arr: any[], pid: number) => {
  return arr.reduce((res, current) => {
    if (current['parentId'] === pid) {
      current.children = arrayToTree(arr, current['menuId'])
      return res.concat(current)
    }
    return res
  }, [])
}

/**
 * @desc 获取部门状态字典
 */
const getDicts = async () => {
  const { code, data } = await apiGetUserDicts({ typeKey: 'sys_normal_disable' })
  if (code === 20000) {
    statusOptions.value = data
  }
}

/**
 * @desc 解析字典内容
 */
const parseDicts = (key: any) => {
  const findItem = statusOptions.value.find((item: any) => item.dictValue === key)
  return findItem ? findItem.dictLabel : '--'
}

/**
 * @desc 列表删除
 */
const handleDel = (menuId: number) => {
  YmModal.delete(async () => {
    const { code } = await apiDelMenuList({ menuId })
    if (code === 20000) {
      message.success('删除成功')
      getSourceData()
    }
  })
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
  detailInstance.value.initModal(actionTypeEnum.EDIT, { menuId: record.menuId })
}
</script>

<style lang="less" scoped></style>
