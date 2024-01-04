<template>
  <div class="container">
    <div class="search">
      <slot name="search"></slot>
    </div>
    <div class="content">
      <div class="handle-wraps">
        <slot name="handle"></slot>
      </div>
      <div class="custom-table-wrap">
        <slot name="table"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  row-gap: 16px;

  .content {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 32px 32px;
    flex: 1;
    .handle-wraps {
      display: flex;
      justify-content: space-between;
      margin-bottom: 17px;
    }

    .custom-table-wrap {
      position: relative;
      flex: 1;
    }
  }
}
</style>
