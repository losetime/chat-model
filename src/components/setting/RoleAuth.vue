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
      <a-form-item label="角色名称">
        <a-input v-model:value="detailInfo.roleName" disabled />
      </a-form-item>
      <a-form-item label="权限字符">
        <a-input v-model:value="detailInfo.roleKey" disabled />
      </a-form-item>
      <a-form-item label="权限范围">
        <a-select v-model:value="detailInfo.dataScope">
          <a-select-option value="1">全部数据权限</a-select-option>
          <a-select-option value="3">本部门数据权限</a-select-option>
          <a-select-option value="4">本部门及以下数据权限</a-select-option>
          <a-select-option value="5">仅本人数据权限</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { apiUpdateRoleAuth } from '@/service/api/setting'

const props = defineProps<{
  getSourceData: Function
}>()

const labelCol = { span: 4 }

const visible = ref<boolean>(false)

const title = ref<string>('分配数据权限')

const detailInfo = reactive<any>({
  roleName: '',
  roleKey: '',
  dataScope: '1',
})

/**
 * @desc 初始化对话框
 */
const initModal = async (initInfo: any) => {
  Object.assign(detailInfo, { ...initInfo, deptIds: [] })
  visible.value = true
}

/**
 * @desc 确认
 */
const handleConfirm = async () => {
  const { code } = await apiUpdateRoleAuth(detailInfo)
  if (code === 20000) {
    message.success('操作成功')
    props.getSourceData()
    handleCancel()
  }
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
  }
}
</style>
