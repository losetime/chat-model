<template>
  <div class="bid-section-wrapper">
    <!-- <a-button @click="getSceneData">
      <template #icon>
        <Iconfont type="icon-xiazai" />
      </template>
      获取现场数据
    </a-button> -->
    <a-tooltip placement="bottom" :mouseEnterDelay="0.5">
      <template #title>
        <div>{{ activeProject.bidName }}</div>
        <div style="margin-top: 10px">{{ activeProject.sectionCode }}</div>
      </template>
      <a-button @click="openProjectList">{{ activeProject.bidName }}</a-button>
    </a-tooltip>
    <a-modal v-model:open="visible" title="基建项目标段选择" @ok="handleOk" @cancel="handleCancel">
      <div class="project-wrap">
        <p
          v-for="item in projectOptions"
          :key="item.sectionCode"
          :class="{ 'active-item': activeTag.sectionCode === item.sectionCode }"
          @click="chooseProjectItem(item)"
        >
          {{ item.bidName }}
        </p>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { apiGetProjectSection } from '@/service/api/common'
import { useAppStore } from '@/store/modules/app'

export interface IProjectSection {
  bidName: string
  sectionCode: string
}

const projectOptions = ref<IProjectSection[]>([])

const activeTag = ref<IProjectSection>({ bidName: '', sectionCode: '' })

const activeProject = ref<IProjectSection>({ bidName: '', sectionCode: '' })

const visible = ref(false)

const appStore = useAppStore()

// onBeforeMount(() => {
//   getProjectSection()
// })

// /**
//  * @desc 获取所有标段
//  */
// const getProjectSection = async () => {
//   const { code, data } = await apiGetProjectSection()
//   if (code === 20000) {
//     projectOptions.value = data
//     let currentSection = null
//     // 获取缓存数据
//     const storage = sessionStorage.getItem('PROJECT_SECTION')
//     const storageSection = storage && storage !== 'undefined' ? JSON.parse(storage) : {}
//     // 判断当前缓存标段是否存在于获取的标段中
//     const hasExist = data.filter((item: any) => item.sectionCode === storageSection.sectionCode).length > 0
//     if (hasExist) {
//       currentSection = storageSection
//     } else {
//       if (data && data.length > 0) {
//         currentSection = data[0]
//         sessionStorage.setItem('PROJECT_SECTION', JSON.stringify(data[0]))
//       } else {
//         currentSection = {}
//       }
//     }
//     appStore.projectSection = currentSection
//     activeTag.value = currentSection
//     activeProject.value = currentSection
//   }
// }

/**
 * @desc 打开项目选择列表
 */
const openProjectList = () => {
  visible.value = true
}

/**
 * @desc 选择项目列表
 */
const chooseProjectItem = (item: any) => {
  activeTag.value = item
}

/**
 * @desc 确定选择
 */
const handleOk = () => {
  activeProject.value = activeTag.value
  appStore.projectSection = activeTag.value
  sessionStorage.setItem('PROJECT_SECTION', JSON.stringify(activeTag.value))
  handleCancel()
  //刷新当前界面
  if (location.href.indexOf('#reloaded') == -1) {
    location.href = location.href + '#reloaded'
    location.reload()
  }
}

/**
 * @desc 取消
 */
const handleCancel = () => {
  activeTag.value = activeProject.value
  visible.value = false
}
</script>

<style lang="less" scoped>
.bid-section-wrapper {
  display: flex;
  ::v-deep(.ant-btn) {
    margin-left: 14px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      max-width: 600px !important;
      overflow: hidden;
    }
  }
}
.project-wrap {
  max-height: 500px;
  overflow: auto;
  p {
    cursor: pointer;
    padding: 5px 10px;
    margin-bottom: 5px;
  }
  .active-item {
    background-color: #e6f7ff;
  }
  p:hover {
    background-color: #e6f7ff;
  }
}
</style>
