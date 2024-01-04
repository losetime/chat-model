import { App, computed } from 'vue'
import { debounce } from 'lodash-es'
import { useAppStore } from '@/store/modules/app'

export const setPermissionDirective = (app: App<Element>) => {
  const appStore = useAppStore()
  const permission = computed(() => appStore.userInfo.permissions)

  app.directive('permission', (el, binding: any) => {
    // 每次进入页面先默认没有权限
    el.disabled = true
    if (permission.value.includes('*:*:*')) {
      el.disabled = false
      return
    }
    if (permission.value.includes(binding.value.key)) {
      el.disabled = false
      return
    } else {
      el.disabled = true
    }
    const promptNode: any = document.getElementById('prompt')
    el.addEventListener(
      'mouseover',
      debounce((event: any) => {
        promptNode.style.top = `${event.clientY}px`
        promptNode.style.left = `${event.clientX + 20}px`
        promptNode.style.display = 'block'
        promptNode.style.transition = 'all 0.5s'
      }, 500),
    )
    el.addEventListener('mouseleave', () => {
      promptNode.style.display = 'none'
    })
    promptNode.addEventListener('mouseleave', () => {
      promptNode.style.display = 'none'
    })
  })
}
