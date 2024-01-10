<template>
  <div class="chat-wrapper">
    <div class="group-wrap">
      <div class="new-chat-group" @click="handleNewChat">新建对话</div>
      <div
        :class="{ 'group-item': true, 'group-item-active': chatActiveIndex === index }"
        v-for="(item, index) in chatGroup"
        :key="item.chatId"
        @click="handleSwitchChat(item.chatId)"
      >
        <div class="chat-name">
          <AliwangwangOutlined />
          <a-tooltip>
            <template #title>{{ item.chatName }}</template>
            <div class="name-text">{{ item.chatName }}</div>
          </a-tooltip>
        </div>
        <a-space v-if="chatActiveIndex === index">
          <FormOutlined @click.stop="handleUpdateChat" />
          <DeleteOutlined @click.stop="handleDeleteChat" />
        </a-space>
      </div>
    </div>
    <div class="content-wrap">
      <ChatRender ref="chatRenderInstance" :chatActiveIndex="chatActiveIndex" />
      <div class="input-wrap" v-if="chatGroup.length > 0">
        <a-textarea
          v-model:value="questionMsg"
          :autosize="{ minRows: 4 }"
          placeholder="请输入"
          allow-clear
          @keyup.enter="handleQuestionSubmit"
        />
        <a-button type="primary" :icon="h(SendOutlined)" :disabled="!questionMsg" @click="handleQuestionSubmit" />
      </div>
    </div>
    <NewChat ref="newChatInstance" :chatActiveIndex="chatActiveIndex" :handleReacquire="handleChatInit" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, h } from 'vue'
import { AliwangwangOutlined, FormOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons-vue'
import ChatRender from '@/components/chat/ChatRender.vue'
import NewChat from '@/components/chat/NewChat.vue'
import { nanoid } from 'nanoid'
import { useChatStore } from '@/store/modules/chat'
import { YmModal } from '@/utils/antd'
import { useCompRef } from '@/hooks/useCompRef'
import { actionTypeEnum } from '@/enums/commonEnum'
import { message } from 'ant-design-vue'

const chatStore = useChatStore()

const questionMsg = ref<string>('')

const chatGroup = ref<any[]>([])

const chatActiveIndex = computed(() => {
  const findIndex = chatStore.chatInfoList.findIndex((item: any) => item.chatId === chatStore.chatActiveId)
  if (findIndex === -1) {
    return 0
  } else {
    return findIndex
  }
})

onMounted(() => {
  handleChatInit()
})

const chatRenderInstance = useCompRef<typeof ChatRender>()

const handleQuestionSubmit = (event: any) => {
  if (!questionMsg.value) return
  const instance = chatRenderInstance.value
  if (instance?.messageLoading || instance?.answerDone) {
    message.info('请稍等，正在接收...')
  } else {
    const queryMsg = questionMsg.value
    questionMsg.value = ''
    // 取消输入框回车后的换行
    event.preventDefault()
    // 修改对话标题为第一个问题
    if (instance && instance.chatContent.length <= 0) {
      chatGroup.value[chatActiveIndex.value].chatName = queryMsg
    }
    instance?.getChatAnswer(queryMsg)
  }
}

/**
 * @desc 初始化对话数据
 */
const handleChatInit = () => {
  const chatInfoList = chatStore.chatInfoList
  if (chatInfoList.length > 0) {
    // 设置对话组
    chatGroup.value = chatInfoList.map((item: any) => ({ chatName: item.chatName, chatId: item.chatId }))
    // 设置对话内容
    chatRenderInstance.value?.setChatContent(chatInfoList[chatActiveIndex.value].chatContent)
  } else {
    chatGroup.value = []
    chatRenderInstance.value?.setChatContent([])
  }
}

/**
 * @desc 创建新对话
 */
const handleNewChat = () => {
  chatStore.chatInfoList.unshift({ chatName: '新对话', chatId: nanoid(), chatContent: [] })
  chatStore.chatActiveId = chatStore.chatInfoList[0].chatId
  handleChatInit()
}

/**
 * @desc 切换对话
 */
const handleSwitchChat = (chatId: string) => {
  const instance = chatRenderInstance.value
  if (instance?.answerDone) {
    message.info('请稍等，正在接收...')
  } else {
    chatStore.chatActiveId = chatId
    // 设置对话内容
    chatRenderInstance.value?.setChatContent(chatStore.chatInfoList[chatActiveIndex.value].chatContent)
  }
}

/**
 * @desc 删除对话
 */
const handleDeleteChat = () => {
  YmModal.delete(async () => {
    chatStore.chatInfoList.splice(chatActiveIndex.value, 1)
    handleChatInit()
  })
}

const newChatInstance = useCompRef<typeof NewChat>()

/**
 * @desc 编辑对话
 */
const handleUpdateChat = () => {
  newChatInstance.value?.initModal(actionTypeEnum.EDIT)
}
</script>

<style lang="less" scoped>
.chat-wrapper {
  padding: 14px;
  display: flex;
  background-color: #ffffff;
  .group-wrap {
    width: 300px;
    height: calc(100vh - 28px);
    padding: 28px;
    border: 1px solid #e5e5e5;
    .new-chat-group {
      height: 45px;
      line-height: 45px;
      text-align: center;
      cursor: pointer;
      border-radius: 8px;
      background-color: #1577ff;
      color: #ffffff;
    }
    .group-item {
      display: flex;
      justify-content: space-between;
      padding: 14px;
      margin-top: 14px;
      border: 1px solid #e5e5e5;
      cursor: pointer;
      border-radius: 5px;
      &:hover {
        border: 1px dashed #1677ff;
        color: #1677ff;
      }
      .chat-name {
        display: flex;
        align-items: center;
        .name-text {
          width: 145px;
          padding: 0 8px;
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .group-item-active {
      border: 1px solid #1677ff;
      color: #1677ff;
    }
  }
  .content-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 14px;
    border: 1px solid #e5e5e5;
    .input-wrap {
      min-height: 100px;
      display: flex;
      padding: 28px;
      ::v-deep(.ant-input-affix-wrapper) {
        .ant-input {
          font-size: 16px;
        }
      }

      .ant-btn {
        margin-left: 14px;
        font-size: 18px;
        height: 40px;
        width: 50px;
      }
    }
  }
}
</style>
