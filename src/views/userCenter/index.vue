<template>
  <Header />
  <div class="user-center-wrapper">
    <div class="user-info-wrap">
      <a-card title="个人信息">
        <div class="avatar-wrap"><img :src="userInfo.avatar ? userInfo.avatar : localeAvatar" alt="" /></div>
        <div class="info-wrap">
          <div class="info-item">
            <div class="left-attribute">
              <Iconfont type="icon-yonghu" class="iconfont" />
              <span>用户名称</span>
            </div>
            <span>{{ userInfo.userName }}</span>
          </div>
          <div class="info-item">
            <div class="left-attribute">
              <Iconfont type="icon-yonghu" class="iconfont" />
              <span>手机号码</span>
            </div>
            <span>{{ userInfo.phonenumber }}</span>
          </div>
          <div class="info-item">
            <div class="left-attribute">
              <Iconfont type="icon-yonghu" class="iconfont" />
              <span>用户邮箱</span>
            </div>
            <span>{{ userInfo.email }}</span>
          </div>
          <div class="info-item">
            <div class="left-attribute">
              <Iconfont type="icon-yonghu" class="iconfont" />
              <span>所属部门</span>
            </div>
            <span>{{ userInfo.dept?.deptName }}</span>
          </div>
          <div class="info-item">
            <div class="left-attribute">
              <Iconfont type="icon-yonghu" class="iconfont" />
              <span>所属角色</span>
            </div>
            <span>{{ userInfo.roleGroup }}</span>
          </div>
          <div class="info-item">
            <div class="left-attribute">
              <Iconfont type="icon-yonghu" class="iconfont" />
              <span>创建日期</span>
            </div>
            <span>{{ userInfo.createTime }}</span>
          </div>
        </div>
      </a-card>
    </div>
    <div class="base-info-wrap">
      <a-card title="基本资料">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="修改密码">
            <update-password :userName="userInfo.userName" :isForceUpdate="false" />
          </a-tab-pane>
          <a-tab-pane key="2" tab="注销">
            <a-form labelAlign="left">
              <a-form-item>
                <a-input type="password" v-model:value="userPassword" placeholder="请输入用户密码" style="width: 50%" />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" danger @click="handleKillUser">注销</a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, createVNode } from 'vue'
import Header from '@/layout/Header.vue'
import Iconfont from '@/components/common/Iconfont.vue'
import { apiGetUserInfo, apiKillUser } from '@/service/api/setting'
import UpdatePassword from '@/components/userCenter/UpdatePassword.vue'
import localeAvatar from '@/assets/images/common/avatar.png'
import { message, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'

const router = useRouter()

const appStore = useAppStore()

const activeKey = ref('1')

const userInfo = ref<any>({
  userName: '',
})

const userPassword = ref<string>('')

onMounted(() => {
  getUserInfo()
})

/**
 * @desc 获取用户信息
 */
const getUserInfo = async () => {
  const { code, data } = await apiGetUserInfo()
  if (code === 20000) {
    userInfo.value = { ...data.user, roleGroup: data.roleGroup }
  }
}

/**
 * @desc 注销
 */
const handleKillUser = async () => {
  if (userPassword.value === '') {
    message.warning('请输入密码')
    return
  }
  Modal.confirm({
    title: '提示',
    icon: createVNode(ExclamationCircleOutlined),
    content: '注销后账号将无法找回，是否确认注销？',
    okText: '确认',
    cancelText: '取消',
    async onOk() {
      const { code } = await apiKillUser({
        password: userPassword.value,
      })
      if (code === 20000) {
        message.success('用户注销成功')
        appStore.$reset()
        sessionStorage.removeItem('appStore')
        router.replace({
          name: 'Login',
        })
      }
    },
  })
}
</script>

<style lang="less" scoped>
.user-center-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 14px;
  height: calc(100vh - 200px);
  background-color: #ffffff;
  .user-info-wrap {
    width: 400px;
    .ant-card {
      .ant-card-body {
        .avatar-wrap {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #f0f0f0;
          img {
            width: 150px;
          }
        }
        .info-wrap {
          font-size: 14px;
          .info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            padding: 0 14px;
            border-bottom: 1px solid #f0f0f0;
            .left-attribute {
              display: flex;
              align-items: center;
              .iconfont {
                font-size: 20px;
              }
              span {
                margin-right: 2px;
              }
            }
          }
        }
      }
    }
  }
  .base-info-wrap {
    flex: 1;
    margin-left: 14px;
  }
}
</style>
