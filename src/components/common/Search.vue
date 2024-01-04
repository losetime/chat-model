<template>
  <div class="search-wrapper">
    <slot name="searchItems"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.search-wrapper {
  padding: 32px;
  background-color: #ffffff;
  border-radius: 2px;
  ::v-deep(.ant-form) {
    display: grid;
    grid-template-columns: repeat(auto-fill, 26%);
    grid-row-gap: 20px;
    grid-column-gap: 10px;
    .ant-form-item-label {
      min-width: 80px;
    }
  }
}
</style>
