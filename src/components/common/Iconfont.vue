<template>
  <icon-font :type="type" />
</template>

<script setup lang="ts">
import { createFromIconfontCN } from '@ant-design/icons-vue'

// const iconUrl = new URL('../../assets/iconfont/iconfont.js', import.meta.url).href

const iconUrl = '//at.alicdn.com/t/c/font_4390472_wtg0nqo7vo.js'

const IconFont = createFromIconfontCN({
  scriptUrl: iconUrl,
})

defineProps<{
  type: string
}>()
</script>
