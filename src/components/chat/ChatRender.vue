<template>
  <div v-if="chatContent && chatContent.length > 0" ref="chatContentInstance" class="chat-wrap">
    <div class="chat-item" v-for="item in chatContent" :key="item.id">
      <div class="user-info-wrap">
        <a-avatar shape="square">
          <template #icon>
            <UserOutlined v-if="item.type === 'question'" />
            <AndroidOutlined v-else />
          </template>
        </a-avatar>
      </div>
      <div class="message-wrap">
        <div class="message-text" v-if="item.type === 'question'">{{ item.message }}</div>
        <div class="message-text" v-else v-html="handleMarkdownRender(item.message)"></div>
        <div class="cite-wrap" v-if="item.citeList && item.citeList.length > 0">
          <span class="cite-title">引用文档：</span>
          <div class="cite-list">
            <span v-for="cite in item.citeList" :key="cite.docId">{{ cite.docName }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="message-loading" v-if="messageLoading">
      <LoadingOutlined />
      <span>正在响应</span>
    </div>
  </div>
  <div v-else class="empty-wrap"><a-empty description="暂无对话" /></div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { nanoid } from 'nanoid'
import useTypeWriter from '@/hooks/useTypeWriter'
import MarkdownIt from 'markdown-it'
import { useScroll } from '@vueuse/core'
import { useChatStore } from '@/store/modules/chat'
import { UserOutlined, AndroidOutlined, LoadingOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  chatActiveIndex: number
}>()

const chatStore = useChatStore()

const chatContent = ref<any[]>([])

const citeList = ref<any[]>([])

const messageLoading = ref<boolean>(false)

const markdown: MarkdownIt = MarkdownIt()

/**
 * @desc 设置对话
 */
const setChatContent = (val: any[]) => {
  chatContent.value = val
}

const getChatAnswer = async (queryMsg: string) => {
  messageLoading.value = true
  handleScrollbarBottom()
  chatContent.value.push({
    message: queryMsg,
    type: 'question',
    user: 'wang',
    id: nanoid(),
  })
  const accessToken = '24.4f5e2eb6f63238c85b58d36e5af12565.2592000.1706856348.282335-45910384'
  const url = `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/plugin/y7d1efhd1hs26gpt/?access_token=${accessToken}`
  let isContinue = true
  const response: any = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: queryMsg, plugins: ['uuid-zhishiku'], verbose: true, stream: true }),
  })
  const reader = response.body.getReader()
  let answerCache = ''
  while (isContinue) {
    const { value, done } = await reader.read()
    if (done) {
      handleReceiveDone()
      isContinue = false
      break // 读取完毕
    } else {
      try {
        const answerContent = new TextDecoder('utf-8').decode(value)
        if (answerContent.includes('log_id')) {
          if (answerCache) {
            answerCache += answerContent
            const answerArr = answerCache.split('data: ')
            answerCache = ''
            // console.log('answerArr---1', answerArr)
            handleTextDecoder(answerArr)
          } else {
            const answerArr = answerContent.split('data: ')
            // console.log('answerArr---2', answerArr)
            handleTextDecoder(answerArr)
          }
        } else {
          answerCache += answerContent
        }
      } catch (error) {
        console.log('error: ', error)
      }
    }
  }
}

/**
 * @desc 处理返回数据
 */
const handleTextDecoder = (answerArr: any[]) => {
  for (const item of answerArr) {
    if (item && (item.includes('uuid-zhishiku') || item.includes('chat.completion'))) {
      const itemObj = JSON.parse(item)
      if (itemObj.plugin_id === 'uuid-zhishiku') {
        const response = itemObj.response.result.responses
        for (const cite of response) {
          const findIndex = citeList.value.findIndex((val: any) => val.docId === cite.docId)
          if (findIndex === -1) {
            citeList.value.push({
              docName: cite.docName,
              docId: cite.docId,
            })
          }
        }
      }
      if (itemObj.object === 'chat.completion') {
        const findIndex = chatContent.value.findIndex((item: any) => item.id === itemObj.id)
        if (findIndex === -1) {
          messageLoading.value = false
          chatContent.value.push({
            message: '',
            type: 'answer',
            user: 'rboot',
            id: itemObj.id,
            citeList: [],
          })
          addTextToQueue(itemObj.result)
          handleReceiveStart()
        } else {
          addTextToQueue(itemObj.result)
        }
      }
    }
  }
}

const handleAddChatMessage = (str: string) => {
  const index = chatContent.value.length - 1
  chatContent.value[index].message += str
}

/**
 * @desc 打字效果完成
 */
const handleTypeDone = () => {
  chatContent.value[chatContent.value.length - 1].citeList = citeList.value
  chatStore.chatInfoList[props.chatActiveIndex].chatContent = chatContent.value
}

const { answerDone, addTextToQueue, handleReceiveStart, handleReceiveDone } = useTypeWriter(
  handleAddChatMessage,
  handleTypeDone,
)

/**
 * @desc 返回markdown格式
 */
const handleMarkdownRender = (content: string) => {
  const html = markdown.render(content)
  return html
}

/**
 * @desc 处理滚动条保持在最底部
 */

const chatContentInstance = ref()

watch(
  () => chatContent.value,
  () => {
    handleScrollbarBottom()
  },
  {
    deep: true,
  },
)

const { y } = useScroll(chatContentInstance)

const handleScrollbarBottom = () => {
  nextTick(() => {
    y.value = chatContentInstance.value?.scrollHeight || 0
  })
}

defineExpose({
  answerDone,
  chatContent,
  messageLoading,
  getChatAnswer,
  setChatContent,
})
</script>

<style lang="less" scoped>
.chat-wrap {
  height: calc(100vh - 190px);
  overflow-y: auto;
  padding: 28px;
  .chat-item {
    display: flex;
    margin-bottom: 28px;
    .user-info-wrap {
      .ant-avatar {
        background-color: #1577ff;
      }
      .user-name {
        margin-left: 8px;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .message-wrap {
      margin-left: 14px;
      padding: 12px 20px;
      border-radius: 8px;
      background-color: #eef6ff;
      .message-text {
        width: 100%;
        color: #333333;
      }
      .cite-wrap {
        display: flex;
        font-size: 14px;
        margin-top: 14px;
        .cite-title {
          display: inline-block;
          width: 70px;
          flex-shrink: 0;
          padding: 6px 0;
          color: #83868c;
        }
        .cite-list {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          span {
            color: #83868c;
            font-size: 14px;
            padding: 6px 14px;
            cursor: pointer;
            &:hover {
              background-color: #f7f7f9;
              color: #1677ff;
            }
          }
        }
      }
    }
  }
  .message-loading {
    margin-left: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    .anticon {
      font-size: 25px;
      color: #1677ff;
    }
    span {
      font-size: 14px;
      margin-left: 14px;
      color: #84868c;
    }
  }
}
.empty-wrap {
  height: calc(100vh - 190px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
