import { defineStore } from 'pinia'
import { store } from '@/store'

interface IChatContent {
  message: string
  type: string
  user: string
  id: string
  citeList?: any[]
}

interface IChatInfoList {
  chatName: string
  chatId: string
  chatContent: IChatContent[]
}

interface AppState {
  chatInfoList: IChatInfoList[]
  chatActiveId: string
}

export const useChatStore = defineStore({
  id: 'chat',
  state: (): AppState => ({
    chatInfoList: [],
    chatActiveId: '',
  }),
  actions: {},
})

// Need to be used outside the setup
export function useChatStoreWithOut() {
  return useChatStore(store)
}
