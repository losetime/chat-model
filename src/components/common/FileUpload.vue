<template>
  <a-upload
    :file-list="newFileList"
    :accept="acceptStr"
    :beforeUpload="beforeUpload"
    :listType="listType"
    :maxCount="limit"
    @remove="handleRemove"
    @preview="handlePreview"
    :showUploadList="showUploadList"
  >
    <template v-if="!isDetail && !!fileList && fileList.length < limit">
      <template v-if="type === 'file'">
        <a-button :loading="uploading">
          <upload-outlined />
          文件上传
        </a-button>
      </template>
      <template v-if="type === 'image'">
        <loading-outlined v-if="uploading" />
        <plus-outlined v-else style="font-size: 30px; opacity: 0.45" />
      </template>
    </template>
  </a-upload>
  <a-modal :visible="previewVisible" title="预览" :footer="null" @cancel="handleCancel">
    <video v-if="isPreviewVideo" style="width: 100%" controls :src="previewImage"></video>
    <img v-else alt="example" style="width: 100%" :src="previewImage" />
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { apiFileUpload } from '@/service/api/file'
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { UploadProps } from 'ant-design-vue'
const propsData = defineProps({
  fileList: {
    type: Array,
    default: () => [],
  },
  accept: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: 'image',
  },
  fileSize: {
    type: Number,
    default: 5,
  },
  limit: {
    type: Number,
    default: 5,
  },
  isDetail: {
    type: Boolean,
    default: false,
  },
})

const newFileList = computed(() => {
  return (propsData.fileList || []).map((e) => ({ ...e, status: 'done' }))
})

const showUploadList = computed(() => {
  return propsData.isDetail
    ? {
        showRemoveIcon: false,
        showDownloadIcon: propsData.type != 'image',
      }
    : true
})

const previewVisible = ref(false)
const previewImage = ref('')
const listType = computed(() => {
  return { file: 'text', image: 'picture-card' }[propsData.type] || 'picture-card'
})
const acceptStr = computed(() => {
  return propsData.accept.join(',') || (propsData.type === 'file' ? undefined : '.jpg,.png,.gif,.jpeg,.bmp')
})

const uploading = ref(false)
const emits = defineEmits(['file-change', 'remove'])
const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const sizeLimit = file.size / 1024 / 1024 < propsData.fileSize
  if (!sizeLimit) {
    message.warning(`文件大小不能超过 ${propsData.fileSize} M`)
    return false
  }
  if (propsData.type != 'file' && propsData.accept && propsData.accept.length > 0) {
    if (!RegExp(`(${propsData.accept.join('|')})$`).test(file.name)) {
      message.warning('文件类型错误')
      return false
    }
  }
  doUpload(file)
  return false
}

const handleRemove: UploadProps['onRemove'] = (file) => {
  emits('remove', file)
  return false
}

const doUpload = async (file: any) => {
  try {
    uploading.value = true
    const { data, code, msg } = await apiFileUpload(file)
    if (code != 20000) throw new Error(msg)
    emits('file-change', data)
  } catch (e) {
    message.error(e.message)
    console.log(e)
  } finally {
    uploading.value = false
  }
}

const handleCancel = () => {
  previewVisible.value = false
}
const handlePreview = async (file: any) => {
  if (propsData.type != 'image') return
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj)
  }
  previewImage.value = file.url || file.preview
  previewVisible.value = true
}

const isPreviewVideo = computed(() => {
  if (previewImage.value) {
    let fileName = previewImage.value.substring(previewImage.value.lastIndexOf('/') + 1)
    return /\.(mp4|webm|ogg)$/.test(fileName)
  }
  return false
})
</script>
<style lang="less" scoped></style>
