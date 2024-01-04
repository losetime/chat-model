<template>
  <a-layout-sider
    width="256"
    v-model:collapsed="sidebarStatus"
    :trigger="null"
    collapsible
    class="layout-sider-wrapper"
  >
    <div class="logo-wrap" @click="handleJumpHome">
      <SlackOutlined />
      <span v-if="!sidebarStatus">作业人员职业健康及应急保障系统</span>
    </div>
    <a-menu mode="inline" theme="dark" :selectedKeys="navKey" @select="handleSelectKeys">
      <template v-for="item in sidebarMenu" :key="item.name">
        <a-sub-menu :key="item.name" v-if="isVisibleNextRoute(item)">
          <template #icon>
            <Iconfont :type="item.meta.icon" class="icon-font" />
          </template>
          <template #title>{{ item.meta.title }}</template>
          <template v-for="subItem in item.children">
            <a-menu-item v-if="isVisibleRoute(subItem)" :key="subItem.name">
              <span>{{ subItem.meta.title }}</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <a-menu-item :key="item.name" v-if="!isVisibleNextRoute(item)">
          <template #icon>
            <Iconfont :type="item.meta.icon" class="icon-font" />
          </template>
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import Iconfont from '@/components/common/Iconfont.vue'
import { isVisibleNextRoute, isVisibleRoute } from '@/utils/base'
import { SlackOutlined } from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

// 所有二级导航菜单
const sidebarMenu = ref<any[]>([])

// 匹配当前二级导航
const navKey = ref<string[]>([])

// 侧边栏打开/收起
const sidebarStatus = computed(() => appStore.sidebarStatus)

const routeInfo = computed(() => appStore.routeInfo)

const handleFormattMenu = (data: any[], menu: any[]): any[] => {
  for (const [index, item] of data.entries()) {
    if (item.visible === '0') {
      menu.push({
        name: item.routerName,
        meta: {
          title: item.menuName,
          level: item.level,
          icon: item.icon,
          visible: item.visible === '0',
        },
        children: [],
      })
      if (item.children.length > 0 && menu[index]) {
        handleFormattMenu(item.children, menu[index].children)
      }
    }
  }
  return menu
}

/**
 * @desc 菜单导航
 */
const handleNavigation = (matched: any[]) => {
  // 匹配一级导航
  const firstRoute = matched[0].name
  // 在routerInfo中找到相关对象
  const findItem = routeInfo.value.find((item: any) => item.routerName === firstRoute)
  // 取出该对象的各级children作为菜单
  sidebarMenu.value = handleFormattMenu(findItem.children, [])
  if (sidebarMenu.value.length > 0) {
    if (matched.length > 1) {
      // 由于路由被打平，只有二级路由，所以只会匹配到两个
      // 匹配最后一级路由
      const lastRoute = matched[matched.length - 1].name
      navKey.value = [lastRoute as string]
    } else {
      const matchedName = sidebarMenu.value[0].name
      navKey.value = [matchedName]
      router.replace({ name: matchedName })
    }
  }
}

watch(
  () => route.matched,
  (val: any[]) => {
    handleNavigation(val)
  },
  {
    immediate: true,
  },
)

/**
 * @desc 选择菜单
 */
const handleSelectKeys = ({ selectedKeys }: any) => {
  navKey.value = selectedKeys
  router.replace({ name: selectedKeys[0] })
}

/**
 * @desc 返回首页
 */
const handleJumpHome = () => {
  router.replace({ name: 'Home' })
}
</script>

<style lang="less" scoped>
.layout-sider-wrapper {
  height: 100vh;
  overflow: auto;
  background: #001529;
  .anticon {
    font-size: 20px;
  }
  .logo-wrap {
    display: flex;
    align-items: center;
    height: 32px;
    margin: 16px;
    cursor: pointer;
    .anticon {
      font-size: 25px;
    }
    span {
      color: #ffffff;
      font-size: 17px;
      margin-left: 10px;
    }
  }
}
</style>
