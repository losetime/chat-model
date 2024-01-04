import { onMounted, computed, watch, shallowRef } from 'vue'
import * as echarts from 'echarts'
import { useAppStore } from '@/store/modules/app'
import { nanoid } from 'nanoid'
import { colorsEnum } from '@/enums/commonEnum'

/**
 * @desc 表格逻辑
 * @param isImmediately 是否立即执行
 */
const useEcharts = (initOptions: Function, series: Array<any>) => {
  const appStore = useAppStore()

  // 图表实例
  const chartInstance: any = shallowRef(null)

  const sidebarStatus = computed(() => appStore.sidebarStatus)

  // 生成随机数Id
  const randomId = computed(() => nanoid())

  watch(
    () => sidebarStatus.value,
    () => {
      const timeout = setTimeout(() => {
        resizeChart()
        clearTimeout(timeout)
      }, 200)
    },
  )

  onMounted(() => {
    if (Array.isArray(series) && series.length > 0) {
      chartInit()
    }
    window.addEventListener('resize', function () {
      const timeout = setTimeout(() => {
        resizeChart()
        clearTimeout(timeout)
      }, 200)
    })
  })

  /**
   * @desc 初始化图表
   */
  const chartInit = () => {
    const chartDom: any = document.getElementById(randomId.value)
    chartInstance.value = echarts.init(chartDom)
    const options = initOptions()
    options && chartInstance.value.setOption(options)
  }

  /**
   * @desc 重新渲染
   */
  const resizeChart = () => {
    if (chartInstance.value) {
      chartInstance.value.resize()
    }
  }

  /**
   * @desc 销毁实例
   */
  const destroyInstance = () => {
    if (chartInstance.value) {
      chartInstance.value.dispose()
      chartInstance.value = null
    }
  }

  return {
    echarts,
    randomId,
    colorsEnum,
    chartInit,
    destroyInstance,
    chartInstance,
  }
}

export default useEcharts
