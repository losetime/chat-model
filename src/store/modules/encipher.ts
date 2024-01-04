import { defineStore } from 'pinia'
import { store } from '@/store'

export interface IEncipherStore {
  encryptEnable: boolean
  publicKey: string
  privateKey: string
  servePublicKey: string
}

export const useEncipherStore = defineStore({
  id: 'encipher',
  state: (): IEncipherStore => ({
    encryptEnable: false,
    publicKey: '',
    privateKey: '',
    servePublicKey: '',
  }),
  actions: {},
})

// Need to be used outside the setup
export function useEncipherStoreWithOut() {
  return useEncipherStore(store)
}
