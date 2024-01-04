/**
 * 登录表单验证规则
 */
import { reactive } from 'vue'

// ----------------------------------基本信息规则------------------------------------------
export const loginRules = reactive({
  userName: [{ required: true, message: '账户不能为空', trigger: 'change' }],
  passWord: [{ required: true, message: '密码不能为空', trigger: 'change' }],
  code: [{ required: true, message: '验证码不能为空', trigger: 'change' }],
})
