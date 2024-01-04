import { ref } from 'vue'

export function useCompRef<T extends abstract new (...args: any) => any>() {
  return ref<InstanceType<T>>()
}
