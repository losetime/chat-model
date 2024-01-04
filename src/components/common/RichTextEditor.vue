<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, watchEffect, watch } from 'vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

//声明属性
const props = defineProps({
  modelValue: {
    type: String,
    default: '<p><br></p>',
  },
})
// 声明事件消息
const emits = defineEmits(['update'])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p><br></p>')
watchEffect(() => {
  valueHtml.value = props.modelValue
})
watch(valueHtml, (newHtml: any) => {
  emits('update', newHtml)
})

const getMediaConfig = (type: any) => {
  return {
    fieldName: 'file',
    server: '/papi/file/upload',
    // server: import.meta.env.VITE_APP_BASE_API + '/file/upload',
    maxFileSize: 6 * 1024 * 1024, //
    maxNumberOfFiles: 200,
    allowedFileTypes: type === 'uploadImage' ? ['image/*'] : ['video/*'],
    timeout: 20 * 1000,
    // headers: {
    //   Authorization: 'Bearer ' + getToken(),
    // },
    customInsert(res: any, insertFn: any) {
      const { url, name, path } = res.data
      insertFn(url, name, path)
    },
  }
}

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...', MENU_CONF: { uploadImage: {}, uploadVideo: {} } }
editorConfig.MENU_CONF['uploadImage'] = getMediaConfig('uploadImage')
editorConfig.MENU_CONF['uploadVideo'] = getMediaConfig('uploadVideo')

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>
<template>
  <div>
    <!-- <button @click="getHtml">获取 html</button> -->
  </div>
  <div style="border: 1px solid #ccc">
    <!-- 工具栏 -->
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" style="border-bottom: 1px solid #ccc" />
    <!-- 编辑器 -->
    <Editor v-model="valueHtml" :defaultConfig="editorConfig" @onCreated="handleCreated" style="height: 400px" />
  </div>
</template>
