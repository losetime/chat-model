import { reactive } from 'vue'

// ----------------------------------基本信息规则------------------------------------------

export const updateChatNameRules = reactive({
  chatName: [{ required: true, message: '对话名称不能为空', trigger: 'change' }],
})
