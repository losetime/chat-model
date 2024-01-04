<template>
  <div class="header-wrapper">
    <!-- <div class="header-left-wrap">
      <div class="logo-wrap">
        <img src="../assets/images/common/logo.png" alt="logo" />
        <div class="logo-text">智能工器具室管理系统</div>
      </div>
      <div class="menu-wrap">
        <template v-for="item in headerMenu">
          <div
            :class="{ 'menu-item': true, 'menu-item_active': item.name === currentNavKey }"
            :key="item.name"
            v-if="item.meta.visible"
            @click="handleSelectKeys(item.name)"
          >
            {{ item.meta.title }}
          </div>
        </template>
      </div>
    </div> -->
    <Breadcrumb />
    <div class="header-right-wrap">
      <div class="screen-visualization">
        <Iconfont type="icon-shujudaping" class="quit-full-screen-icon" />
      </div>
      <div class="screen-wrap">
        <Iconfont
          type="icon-tuichuquanping"
          class="quit-full-screen-icon"
          @click="toggleFullscreen"
          v-if="isFullscreen"
        />
        <Iconfont type="icon-quanping" class="full-screen-icon" @click="toggleFullscreen" v-else />
      </div>
      <a-dropdown placement="bottomRight" :trigger="['hover']">
        <div class="user-info">
          <a-avatar class="avatar-wrap">
            <template #icon>
              <Iconfont type="icon-nan_7" />
            </template>
          </a-avatar>
          <span>{{ userName }}</span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0" @click="onUserCenter" v-if="isIncludeUserCenter">个人中心</a-menu-item>
            <a-menu-item key="1" @click="handleSetting" v-if="isIncludeSystemSetting">系统设置</a-menu-item>
            <a-menu-item key="2" @click="onLogout">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, createVNode } from 'vue'
import { useRouter } from 'vue-router'
import Iconfont from '@/components/common/Iconfont.vue'
import screenfull from 'screenfull'
import { useAppStore } from '@/store/modules/app'
import { apiSignOut } from '@/service/api/login'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import Breadcrumb from '@/layout/Breadcrumb.vue'

// const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

// const currentNavKey = ref(route.matched[0].name)

const isFullscreen = ref(false)

// 所有导航菜单
// const headerMenu = computed<any[]>(() => router.getRoutes().filter((val) => val.meta.level === 1))

const isIncludeSystemSetting = computed<boolean>(
  () => router.getRoutes().filter((val) => val.name === 'Setting').length > 0,
)

const isIncludeUserCenter = computed<boolean>(
  () => router.getRoutes().filter((val) => val.name === 'UserCenter').length > 0,
)

const userName = computed(() => appStore.userInfo.userName)

/**
 * @desc 选择菜单
 */
// const handleSelectKeys = (menuName: string) => {
//   currentNavKey.value = menuName
//   const findItem = headerMenu.value.find((val) => val.name === menuName)
//   // 有外链，直接跳转
//   if (findItem.path.includes('http')) {
//     window.open(findItem.path)
//   } else {
//     router.push({ name: menuName })
//   }
// }

/**
 * @desc 全屏切换
 */
const toggleFullscreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
    isFullscreen.value = !screenfull.isFullscreen
  }
}

/**
 * @desc 通知中心
 */
// const jumpNotice = () => {
//   router.push({
//     name: 'Notice',
//   })
// }

/**
 * @desc 个人中心
 */
const onUserCenter = () => {
  router.push({
    name: 'UserCenter',
  })
}

/**
 * @desc 系统设置
 */
const handleSetting = () => {
  router.push({
    name: 'Setting',
  })
}

/**
 * @desc 退出登录
 */
const onLogout = () => {
  Modal.confirm({
    title: '操作提示',
    content: '是否要退出登录？',
    icon: createVNode(ExclamationCircleOutlined),
    async onOk() {
      const { code } = await apiSignOut()
      if (code === 20000) {
        sessionStorage.removeItem('ymToken')
        appStore.token = ''
        router.replace({ name: 'Login' })
      }
    },
  })
}
</script>

<style lang="less" scoped>
.header-wrapper {
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
  .header-left-wrap {
    height: 74px;
    display: flex;
    .logo-wrap {
      width: 200px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 35px;
        height: 35px;
      }
      .logo-text {
        color: #ffffff;
        margin-left: 10px;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .menu-wrap {
      display: flex;
      color: #ffffff;
      .menu-item {
        width: 110px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 16px;
        &:hover {
          background: linear-gradient(180deg, #0055ff 0%, #2a53ff 100%);
          border-radius: 8px;
        }
      }
      .menu-item_active {
        background: linear-gradient(180deg, #0055ff 0%, #2a53ff 100%);
        border-radius: 8px;
      }
    }
  }
  .header-right-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 300px;

    .screen-visualization {
      margin-right: 24px;
    }
    .screen-wrap,
    .screen-visualization {
      .full-screen-icon,
      .quit-full-screen-icon {
        font-size: 25px;
        color: #000000;
        cursor: pointer;
      }
    }
    .ant-badge {
      margin-left: 20px;
      margin-bottom: 4px;
      .anticon-bell {
        font-size: 25px;
        color: #000000;
        cursor: pointer;
      }
    }
    .user-info {
      margin: 0 20px;
      cursor: pointer;
      .avatar-wrap {
        font-size: 22px;
        margin-right: 8px;
      }
      span {
        color: #000000;
      }
    }
  }
}
</style>
