<template>
  <div :id="randomId" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import useEcharts from '@/hooks/useEcharts'

const props = defineProps<{
  series: Array<any>
  color?: any
}>()

watch(
  () => props.series,
  () => {
    if (props.series.length > 0) {
      chartInit()
    }
  },
)

/**
 * @desc 初始化图表
 */
const initOptions = () => {
  let options: any = {}
  options.color = props.color ? props.color : colorsEnum
  options.series = props.series
  return options
}

const { randomId, colorsEnum, chartInit, destroyInstance } = useEcharts(initOptions, props.series)

defineExpose({
  chartInit,
  destroyInstance,
})
</script>
