<template>
  <div class="update-password-wrapper">
    <a-form labelAlign="left">
      <a-form-item label="旧密码" v-bind="validateInfos.oldPassword">
        <a-input-password v-model:value="passwordInfo.oldPassword" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item label="新密码" v-bind="validateInfos.newPassword">
        <a-input-password v-model:value="passwordInfo.newPassword" placeholder="请输入新密码" />
      </a-form-item>
      <a-form-item label="确认密码" v-bind="validateInfos.confirmPassword">
        <a-input-password v-model:value="passwordInfo.confirmPassword" placeholder="请确认新密码" />
      </a-form-item>
      <a-form-item label="验证码" v-bind="validateInfos.code" v-if="isForceUpdate">
        <a-row type="flex" justify="space-between" align="middle">
          <a-col :span="16">
            <a-input v-model:value="passwordInfo.code" placeholder="请输入校验码">
              <template #prefix>
                <UnlockOutlined />
              </template>
            </a-input>
          </a-col>
          <a-col :span="8">
            <div class="login-code">
              <img :src="codeUrl" @click="getCode" class="login-code-img" />
            </div>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
    <a-space>
      <a-button type="primary" :loading="loading" @click="handleSave">确认</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { UnlockOutlined } from '@ant-design/icons-vue'
import { apiUpdatePassword } from '@/service/api/setting'
import { apiForceUpdatePassword, apiGetCodeImage } from '@/service/api/login'
import { userCenterRules } from '@/validator/setting'

const props = defineProps<{
  userName: string
  isForceUpdate: boolean
  reloadLogin?: Function
}>()

const passwordInfo = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  code: '',
  uuid: '',
})

const codeUrl = ref('')

const loading = ref(false)

const useForm = Form.useForm

const { validate, validateInfos } = useForm(passwordInfo, userCenterRules)

onMounted(() => {
  if (props.isForceUpdate) {
    getCode()
  }
})

/**
 * @desc 获取验证码
 */
const getCode = async () => {
  const { code, data } = await apiGetCodeImage()
  if (code === 20000) {
    codeUrl.value = 'data:image/gif;base64,' + data.img
    passwordInfo.uuid = data.uuid
  }
}

/**
 * @desc 修改密码
 */
const handleSave = () => {
  let validateFields = ['oldPassword', 'newPassword', 'confirmPassword']
  if (props.isForceUpdate) {
    validateFields = [...validateFields, 'code', 'uuid']
  }
  validate(validateFields)
    .then(async () => {
      const { oldPassword, newPassword, confirmPassword, code, uuid } = passwordInfo
      if (newPassword !== confirmPassword) {
        message.warning('确认密码与新密码不相同，请检查')
      } else if (newPassword.includes(props.userName)) {
        message.warning('密码中不能包含用户名')
      } else if (oldPassword === newPassword) {
        message.warning('新密码不能与旧密码相同')
      } else {
        loading.value = true
        let result = null
        if (props.isForceUpdate) {
          result = await apiForceUpdatePassword({
            oldPassword,
            newPassword,
            username: props.userName,
            code,
            uuid,
          })
        } else {
          result = await apiUpdatePassword({
            oldPassword,
            newPassword,
          })
        }
        loading.value = false
        if (result.code === 20000) {
          message.success('更新密码成功')
          if (props.isForceUpdate) {
            if (props.reloadLogin) {
              props.reloadLogin()
            }
          }
        }
      }
    })
    .catch((e) => {
      console.warn(e)
    })
}
</script>

<style lang="less" scoped>
.update-password-wrapper {
  ::v-deep(.ant-form) {
    .ant-form-item {
      .ant-form-item-label {
        width: 100px;
      }
      .login-code {
        height: 32px;
        .login-code-img {
          height: 32px;
          cursor: pointer;
          margin-left: 6px;
        }
      }
    }
  }
}
</style>
