import { onBeforeMount } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useChatStore } from '@/store/modules/chat'
import { useRouter } from 'vue-router'
import { getPublicKey, generateClientKey } from '@/service/http/encipherHelper'

const useCache = () => {
  const appStore = useAppStore()

  const chatStore = useChatStore()

  const router = useRouter()

  appStore.$subscribe((_mutation: any, state: any) => {
    if (state.token) {
      sessionStorage.setItem('appStore', JSON.stringify(state))
    } else {
      sessionStorage.removeItem('appStore')
      router.replace({ name: 'Login' })
    }
  })

  chatStore.$subscribe((_mutation: any, state: any) => {
    localStorage.setItem('chatStore', JSON.stringify(state))
  })

  onBeforeMount(async () => {
    getChatStore()
    // await generateClientKey()
    // await getPublicKey()
    // await getAppStore()
  })

  const getAppStore = async () => {
    const appStoreCache = sessionStorage.getItem('appStore')
    if (appStoreCache) {
      appStore.$state = JSON.parse(appStoreCache)
      await appStore.GetRoutersInfo()
      await appStore.GetUserInfo()
    } else {
      router.replace({ name: 'Login' })
    }
  }

  const getChatStore = async () => {
    const chatStoreCache = localStorage.getItem('chatStore')
    if (chatStoreCache) {
      chatStore.$state = JSON.parse(chatStoreCache)
    }
  }
}

export default useCache
