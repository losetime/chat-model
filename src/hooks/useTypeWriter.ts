import { computed, ref } from 'vue'

/**
 * @desc 打字机效果
 */
const useTypeWriter = (callback: Function, handleTypeDone: Function) => {
  const answerQueue = ref<string[]>([])

  const receiveDone = ref<boolean>(false)

  const addTextToQueue = (str: string) => {
    if (!str) return
    answerQueue.value.push(...str.split(''))
  }

  const answerDone = computed(() => {
    const hasStr = answerQueue.value.length > 0
    return receiveDone.value || hasStr
  })

  const handleConsume = () => {
    const hasStr = answerQueue.value.length > 0
    if (hasStr) {
      const str = answerQueue.value.shift()
      callback(str)
    }
    if (receiveDone.value || hasStr) {
      setTimeout(() => {
        handleConsume()
      }, dynamicSpeed())
    } else {
      handleTypeDone()
    }
  }

  // 输出速度动态控制
  const dynamicSpeed = () => {
    const speed = Math.floor(2000 / answerQueue.value.length)
    if (speed > 200) {
      return 200
    } else {
      return speed
    }
  }

  const handleReceiveStart = () => {
    receiveDone.value = true
    handleConsume()
  }

  const handleReceiveDone = () => {
    receiveDone.value = false
  }

  return {
    answerDone,
    handleReceiveStart,
    handleReceiveDone,
    addTextToQueue,
    handleConsume,
  }
}

export default useTypeWriter
