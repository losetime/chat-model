<template>
  <div :id="randomId" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import useEcharts from '@/hooks/useEcharts'

const props = defineProps<{
  series: Array<any>
  xAxis?: Array<any>
  yAxis?: Array<any>
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
  if (props.xAxis) {
    options = {
      xAxis: {
        type: 'category',
        data: props.xAxis,
        axisLabel: {
          color: '#999999',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#999999',
        },
      },
    }
  } else {
    options = {
      xAxis: {
        type: 'value',
        axisLabel: {
          color: '#999999',
        },
      },
      yAxis: {
        type: 'category',
        data: props.yAxis,
        inverse: true,
        axisLabel: {
          color: '#999999',
          formatter: function (name: any) {
            return name.length > 8 ? name.slice(0, 8) + '...' : name
          },
        },
      },
    }
  }
  options.tooltip = {
    trigger: 'axis',
  }
  options.grid = {
    left: '3%',
    right: '2%',
    bottom: '1%',
    top: '10%',
    containLabel: true,
  }
  options.dataZoom = [
    {
      type: 'inside',
    },
  ]
  options.legend = {
    show: true,
    left: 'right',
    textStyle: {
      color: '#999999',
    },
  }
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
