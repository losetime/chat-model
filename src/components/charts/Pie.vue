<template>
  <div :id="randomId" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import useEcharts from '@/hooks/useEcharts'

const props = defineProps<{
  series: any
  legend?: any
  color?: any
  title?: string
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
  const options: any = {
    tooltip: {
      trigger: 'item',
    },
  }
  options.title = {
    text: props?.title,
    left: '42%',
    top: '42%',
    textStyle: {
      color: '#ffffff',
      fontSize: 14,
      width: 100,
    },
  }
  options.legend = props?.legend || null
  options.color = props.color ? props.color : colorsEnum
  options.series = props.series
  return options
}

const { randomId, colorsEnum, chartInit, destroyInstance, chartInstance } = useEcharts(initOptions, props.series)

defineExpose({
  chartInit,
  destroyInstance,
  chartInstance,
})
</script>
