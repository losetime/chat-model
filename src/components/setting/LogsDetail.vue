<template>
  <a-modal
    v-model:open="visible"
    :title="title"
    :destroyOnClose="true"
    :afterClose="handleCancel"
    @ok="handleConfirm"
    width="600px"
  >
    <a-form :label-col="labelCol" labelAlign="left">
      <a-form-item label="操作人">
        <a-input v-model:value="detailInfo.operName" readonly />
      </a-form-item>
      <a-form-item label="业务类型">
        <a-input v-model:value="detailInfo.businessType" readonly />
      </a-form-item>
      <a-form-item label="请求方法">
        <a-input v-model:value="detailInfo.requestMethod" readonly />
      </a-form-item>
      <a-form-item label="请求参数">
        <a-textarea v-model:value="detailInfo.operParam" :rows="6" readonly />
      </a-form-item>
      <a-form-item label="请求地址">
        <a-input v-model:value="detailInfo.operUrl" readonly />
      </a-form-item>
      <a-form-item label="请求结果">
        <a-input v-model:value="detailInfo.jsonResult" readonly />
      </a-form-item>
      <a-form-item label="操作IP">
        <a-input v-model:value="detailInfo.operIp" readonly />
      </a-form-item>
      <a-form-item label="IP类型">
        <a-input v-model:value="detailInfo.operLocation" readonly />
      </a-form-item>
      <a-form-item label="操作时间">
        <a-input v-model:value="detailInfo.operTime" readonly />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const labelCol = { span: 3 }

const visible = ref<boolean>(false)

const title = ref<string>('日志详情')

const detailInfo = ref<any>()

/**
 * @desc 初始化对话框
 */
const initModal = async (initInfo: any) => {
  detailInfo.value = { ...initInfo, businessType: formattBusinessType(initInfo.businessType) }
  visible.value = true
}

// 格式化业务类型
const formattBusinessType = (type: number) => {
  switch (type) {
    case 0:
      return '其他'
    case 1:
      return '新增'
    case 2:
      return '修改'
    case 3:
      return '删除'
  }
}

/**
 * @desc 确认
 */
const handleConfirm = () => {
  handleCancel()
}

/**
 * @desc 关闭
 */
const handleCancel = () => {
  visible.value = false
}

defineExpose({
  initModal,
})
</script>

<style lang="less" scoped>
.ant-form {
  .ant-form-item {
    .ant-input-number {
      width: 100%;
    }
    .ym-tree-wrapper {
      height: 250px;
      padding: 8px;
      box-sizing: border-box;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      overflow-y: auto;
    }
  }
}
</style>
