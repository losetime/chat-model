<template>
  <div class="breadcrumb-wrap">
    <div class="breadcrumb-content">
      <menu-unfold-outlined class="icon" @click="triggerSidebar" v-if="sidebarStatus" />
      <menu-fold-outlined class="icon" @click="triggerSidebar" v-else />
      <a-breadcrumb>
        <a-breadcrumb-item v-for="item in routes" :key="item.name">
          <span v-if="noHandleRoute(item)">{{ item.meta.title }}</span>
          <router-link :to="{ name: item.name }" v-else>{{ item.meta.title }}</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/modules/app'

const route = useRoute()

const routes = computed(() => route.matched as any[])

// 不能被操作的路由
const noHandleRoute = (item: any) => {
  return item.meta.level === 1 || (item.meta.level === 2 && item.meta.visible)
}

const appStore = useAppStore()

const sidebarStatus = computed(() => appStore.sidebarStatus)

/**
 * @desc 打开/收起侧边栏
 */
const triggerSidebar = () => {
  if (sidebarStatus.value) {
    appStore.sidebarStatus = false
  } else {
    appStore.sidebarStatus = true
  }
}
</script>

<style lang="less" scoped>
.breadcrumb-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  padding: 0 14px;
  .breadcrumb-content {
    display: flex;
    align-items: center;
    .icon {
      font-size: 18px;
      margin-right: 14px;
      cursor: pointer;
      &:hover {
        color: #015c61;
      }
    }
  }
}
</style>
