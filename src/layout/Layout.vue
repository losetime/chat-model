<template>
  <div class="app-wrapper">
    <Sidebar />
    <router-view name="sidebar" />
    <div class="container-wrap">
      <Header />
      <div class="main-wrapper">
        <router-view>
          <template #default="{ Component, route }">
            <transition name="fade" mode="out-in">
              <component :is="Component" :key="route.fullPath" class="main-content" />
            </transition>
          </template>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/layout/Header.vue'
import Sidebar from '@/layout/Sidebar.vue'
</script>
<style lang="less">
.app-wrapper {
  display: flex;
  background-color: #f0f2f5;
  .container-wrap {
    flex: 1;
    .main-wrapper {
      padding: 20px 24px 0;
      .fade-enter-from {
        /* 进入时的透明度为0 和 刚开始进入时的原始位置通过active透明度渐渐变为1 */
        opacity: 0;
        transform: translateY(5%);
      }
      .fade-enter-to {
        /*定义进入完成后的位置 和 透明度 */
        transform: translateY(0%);
        opacity: 1;
      }
      .fade-leave-active,
      .fade-enter-active {
        transition: all 0.4s ease-out;
      }
      .fade-leave-from {
        /* 页面离开时一开始的css样式,离开后为leave-to，经过active渐渐透明 */
        transform: translateY(0%);
        opacity: 1;
      }
      .fade-leave-to {
        /* 这个是离开后的透明度通过下面的active阶段渐渐变为0 */
        transform: translateY(-5%);
        opacity: 0;
      }
      .main-content {
        height: calc(100vh - 138px);
        box-sizing: border-box;
        overflow: auto;
        .handle-wrap {
          background-color: #ffffff;
          padding: 14px;
        }
        .table-wrap {
          position: relative;
          background-color: #ffffff;
          padding: 14px 14px 0 14px;
          margin-top: 14px;
          height: calc(100% - 74px);
        }
      }
    }
  }
}
</style>
