import { ref } from 'vue'

/**
 * @desc 打字机效果
 */
const useTypeWriter = (callback: Function, handleTypeDone: Function) => {
  const answerQueue = ref<string[]>([])

  const consuming = ref<boolean>(false)

  const addTextToQueue = (str: string) => {
    if (!str) return
    answerQueue.value.push(...str.split(''))
  }

  const handleConsume = () => {
    const hasStr = answerQueue.value.length > 0
    if (hasStr) {
      const str = answerQueue.value.shift()
      callback(str)
    }
    if (consuming.value || hasStr) {
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

  const handleStart = () => {
    consuming.value = true
    handleConsume()
  }

  const handleDone = () => {
    consuming.value = false
  }

  return {
    handleStart,
    handleDone,
    addTextToQueue,
    handleConsume,
  }
}

export default useTypeWriter
