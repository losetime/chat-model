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
      <a-form-item label="对话名称" v-bind="validateInfos.chatName">
        <a-input v-model:value="detailInfo.chatName" placeholder="请输入对话名称" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Form } from 'ant-design-vue'
import { updateChatNameRules } from '@/validator/chat'
import { actionTypeEnum } from '@/enums/commonEnum'
import { useChatStore } from '@/store/modules/chat'

const props = defineProps<{
  handleReacquire: Function
  chatActiveIndex: number
}>()

const chatStore = useChatStore()

const labelCol = { span: 4 }

const visible = ref<boolean>(false)

const title = ref<string>('更新对话')

const handleType = ref(actionTypeEnum.ADD)

const detailInfo = reactive({
  chatName: '',
})

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, updateChatNameRules)

/**
 * @desc 初始化对话框
 */
const initModal = async (type: number) => {
  handleType.value = type
  detailInfo.chatName = chatStore.chatInfoList[props.chatActiveIndex].chatName
  visible.value = true
}

/**
 * @desc 确认
 */
const handleConfirm = () => {
  validate().then(async () => {
    chatStore.chatInfoList[props.chatActiveIndex].chatName = detailInfo.chatName
    props.handleReacquire()
    handleCancel()
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

<style lang="less" scoped>
.ant-form {
  .ant-form-item {
    .ant-input-number {
      width: 100%;
    }
  }
}
</style>
