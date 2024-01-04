import { computed, watch, onMounted } from 'vue'
import { useAppStore } from '@/store/modules/app'

/**
 * @desc 获取标段后重新加载页面
 */
const useSectionCode = (reloadFn?: Function) => {
  const appStore = useAppStore()

  const sectionCode = computed<string>(() => appStore.projectSection.sectionCode)

  watch(
    () => sectionCode.value,
    () => {
      if (reloadFn) {
        reloadFn(sectionCode.value)
      }
    },
  )

  onMounted(() => {
    if (sectionCode.value && reloadFn) {
      reloadFn(sectionCode.value)
    }
  })

  return { sectionCode }
}

export default useSectionCode
