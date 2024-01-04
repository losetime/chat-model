<template>
  <div class="access-control-wrapper">
    <a-tabs v-model:activeKey="activeTab" @change="handleTabChange">
      <a-tab-pane key="1" tab="访问时间控制" />
      <a-tab-pane key="2" tab="访问IP控制" />
    </a-tabs>
    <div class="handle-wrap">
      <a-space>
        <a-button type="primary" @click="handleAdd">新增</a-button>
      </a-space>
    </div>
    <div class="custom-table-wrap" v-if="activeTab === '1'">
      <ym-table
        rowKey="id"
        :columns="accessControlTimeColumn"
        :getTableList="apiGetAccessControlTimeRecord"
        :isImmediately="false"
        :row-selection="false"
        table-x="max-content"
        ref="tableInstance"
      >
        <template #action="{ record }">
          <a-space>
            <a-button type="link" size="small" danger @click="handleDelete(record)">删除</a-button>
          </a-space>
        </template>
      </ym-table>
    </div>
    <div class="custom-table-wrap" v-else>
      <ym-table
        rowKey="id"
        :columns="accessControlIPColumn"
        :getTableList="apiGetAccessControlIPRecord"
        :isImmediately="false"
        :row-selection="false"
        table-x="max-content"
        ref="tableInstance"
      >
        <template #action="{ record }">
          <a-space>
            <a-button type="link" size="small" danger @click="handleDelete(record)">删除</a-button>
          </a-space>
        </template>
      </ym-table>
    </div>
    <a-modal v-model:open="visible" :title="modalTitle" @ok="handleConfirm" width="30%">
      <a-form :label-col="labelCol" labelAlign="left">
        <a-form-item label="限制访问时间段" v-if="activeTab === '1'">
          <a-range-picker
            valueFormat="YYYY-MM-DD HH:mm:ss"
            format="YYYY-MM-DD HH:mm:ss"
            v-model:value="accessControlVal"
            show-time
          />
        </a-form-item>
        <a-form-item label="限制访问IP" v-else>
          <a-input v-model:value="accessControlVal" placeholder="请输入限制访问IP" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import { accessControlTimeColumn, accessControlIPColumn } from '@/columns/setting'
import {
  apiGetAccessControlIPRecord,
  apiDeleteAccessControlIP,
  apiAddAccessControlIP,
  apiGetAccessControlTimeRecord,
  apiDeleteAccessControlTime,
  apiAddAccessControlTime,
} from '@/service/api/setting'
import { YmModal } from '@/utils/antd'
import { message } from 'ant-design-vue'

onMounted(() => {
  handleReacquire()
})

const activeTab = ref<string>('1')

const tableInstance = ref<any>(null)

const handleTabChange = () => {
  setTimeout(() => {
    handleReacquire()
  }, 200)
}

// 重新获取列表
const handleReacquire = (page?: number) => {
  tableInstance.value.handleReacquire(page)
}

const handleDelete = (record: any) => {
  if (activeTab.value === '1') {
    YmModal.delete(async () => {
      const { code } = await apiDeleteAccessControlTime({ id: record.banId })
      if (code === 20000) {
        message.success('删除成功')
        handleReacquire()
      }
    })
  } else {
    YmModal.delete(async () => {
      const { code } = await apiDeleteAccessControlIP({ id: record.banId })
      if (code === 20000) {
        message.success('删除成功')
        handleReacquire()
      }
    })
  }
}

// -------------------------------------- 新增 -----------------------------------------------

const labelCol = { span: 5 }

const visible = ref<boolean>(false)

const modalTitle = ref<string>('限制访问时间段')

const accessControlVal = ref<string | string[]>('')

const handleAdd = () => {
  if (activeTab.value === '1') {
    modalTitle.value = '限制访问时间段'
  } else {
    modalTitle.value = '限制访问IP'
  }
  visible.value = true
}

const handleConfirm = async () => {
  switch (activeTab.value) {
    case '1':
      if (accessControlVal.value && accessControlVal.value.length > 0) {
        const { code } = await apiAddAccessControlTime({
          startTime: accessControlVal.value[0],
          endTime: accessControlVal.value[1],
        })
        if (code === 20000) {
          message.success('新增成功')
          visible.value = false
          accessControlVal.value = []
          handleReacquire(1)
        }
      } else {
        message.warn('请选择限制访问时间段')
      }
      break
    case '2':
      if (accessControlVal.value) {
        const { code } = await apiAddAccessControlIP({
          ip: accessControlVal.value,
        })
        if (code === 20000) {
          message.success('新增成功')
          visible.value = false
          accessControlVal.value = ''
          handleReacquire(1)
        }
      } else {
        message.warn('请输入限制访问IP')
      }
      break
  }
}
</script>

<style lang="less" scoped>
.access-control-wrapper {
  padding: 32px;
  background-color: #ffffff;
  .handle-wrap {
    margin-bottom: 14px;
  }
}
</style>
