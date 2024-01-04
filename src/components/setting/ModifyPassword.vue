<template>
  <a-modal
    v-model:open="visible"
    :title="title"
    :destroyOnClose="true"
    :afterClose="handleCancel"
    @ok="handleConfirm"
    width="500px"
  >
    <a-form layout="vertical">
      <a-form-item label="请输入新密码" v-bind="validateInfos.password">
        <a-input v-model:value="detailInfo.password" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { passwordRules } from '@/validator/setting'
import { apiModifyPassword } from '@/service/api/setting'

const visible = ref<boolean>(false)

const title = ref<string>('提示')

const detailInfo = reactive({
  userId: 0,
  password: '',
})

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, passwordRules)

/**
 * @desc 初始化对话框
 */
const initModal = (initInfo: any) => {
  detailInfo.userId = initInfo.userId
  visible.value = true
}

/**
 * @desc 确认
 */
const handleConfirm = () => {
  validate().then(async () => {
    const { code } = await apiModifyPassword({ ...detailInfo })
    if (code === 20000) {
      message.success('修改用户密码成功')
      handleCancel()
    }
  })
}

/**
 * @desc 关闭
 */
const handleCancel = () => {
  resetFields()
  visible.value = false
}

defineExpose({
  initModal,
})
</script>

<style lang="less" scoped></style>
