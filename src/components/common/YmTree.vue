<template>
  <div class="ym-tree-wrapper">
    <a-input-search v-model:value="searchValue" placeholder="输入关键字搜索" v-if="showSearch" />
    <a-tree
      :tree-data="treeData"
      :field-names="fieldNames"
      :checkable="checkable"
      :checkStrictly="checkStrictly"
      v-model:expanded-keys="expandedKeys"
      v-model:selected-keys="selectedKeys"
      v-model:auto-expand-parent="autoExpandParent"
      v-model:checkedKeys="checkedKeys"
      @expand="onExpand"
      @select="onSelected"
      @right-click="onRightClick"
      @check="onChecked"
      @load="onLoad"
      :showLine="showLine"
      ref="treeInsance"
      block-node
    >
      <template #title="record" v-if="customTitle">
        <slot name="title" :record="record"></slot>
      </template>
      <template #title="record" v-else>
        <span v-if="record[titleField].indexOf(searchValue) > -1">
          <span>{{ record[titleField].substr(0, record[titleField].indexOf(searchValue)) }}</span>
          <span style="color: #ff7875">{{ searchValue }}</span>
          <span>{{ record[titleField].substr(record[titleField].indexOf(searchValue) + searchValue.length) }}</span>
        </span>
        <span v-else>{{ record[titleField] }}</span>
      </template>
    </a-tree>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue'
import type { TreeProps } from 'ant-design-vue'

interface IFieldNames {
  title?: string
  key?: string
  children?: string
}

interface Props {
  fieldNames?: IFieldNames // 自定义字段
  treeData: TreeProps['treeData'] // tree数据
  customTitle?: boolean // 是否自定义title
  showSearch?: boolean // 是否显示搜索
  checkable?: boolean
  showLine?: boolean
  checkStrictly?: boolean
  defaultChecked?: number[]
  selectedKeys?: string[] | number[]
  expandedKeys?: string[] | number[]
}

// note: 非基本类型要使用函数返回
const props = withDefaults(defineProps<Props>(), {
  fieldNames: () => ({
    title: 'title',
    key: 'id',
    children: 'children',
  }),
  treeData: () => [],
  customTitle: false,
  showSearch: true,
  checkable: false,
  showLine: true,
  checkStrictly: false,
  defaultChecked: () => [],
  selectedKeys: () => [],
  expandedKeys: () => [],
})

const emit = defineEmits<{
  (e: 'search', searchVal: any): void
  (e: 'select', keys: number[], event: any): void
  (e: 'rightClick', params: any): void
  (e: 'check', keys: number[], event: any): void
  (e: 'load', loadedKeys: number[], event: any): void
}>()

const searchValue = ref<string>('')

// 展开/收起key集合
const expandedKeys = ref<string[] | number[]>([])
// 选择节点集合
const selectedKeys = ref<string[] | number[]>([])
// 多选
const checkedKeys = ref<string[] | number[]>(props.defaultChecked)
// 自动展开/收起父节点
const autoExpandParent = ref<boolean>(false)

const titleField = computed(() => (props.fieldNames.title ? props.fieldNames.title : 'title'))

const keyField = computed(() => (props.fieldNames.key ? props.fieldNames.key : 'key'))

const childrenField = computed(() => (props.fieldNames.children ? props.fieldNames.children : 'children'))

const dataList = ref<any[]>([])

const treeInsance = ref<any>(null)

watchEffect(() => {
  if (props.selectedKeys.length > 0) {
    selectedKeys.value = props.selectedKeys
  } else {
    const firstNode = props.treeData[0]
    // 设置第一次
    selectedKeys.value = firstNode ? [firstNode[keyField.value]] : [-1]
  }
  if (props.expandedKeys.length > 0) {
    expandedKeys.value = props.expandedKeys
  }
})

watch(
  () => props.treeData,
  () => {
    dataList.value = generateList(props.treeData, [])
  },
)

watch(searchValue, (value) => {
  emit('search', value)
  const expanded: any = dataList.value
    .map((item: any) => {
      if (item[titleField.value].indexOf(value) > -1) {
        return getParentKey(item[keyField.value], props.treeData)
      }
      return null
    })
    .filter((item, i, self) => item && self.indexOf(item) === i)
  expandedKeys.value = expanded
  searchValue.value = value
  autoExpandParent.value = true
})

/**
 * @desc 将树形节点改为一维数组
 */
const generateList = (data: any, dataList: any[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    const tempObj: any = {}
    tempObj[titleField.value] = node[titleField.value]
    tempObj[keyField.value] = node[keyField.value]
    dataList.push(tempObj)
    if (node[childrenField.value]) {
      generateList(node[childrenField.value], dataList)
    }
  }
  return dataList
}

/**
 * @desc 获取父元素key
 */
const getParentKey = (key: string | number, tree: any[]): string | number | undefined => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node[childrenField.value]) {
      if (node[childrenField.value].some((item: any) => item[keyField.value] === key)) {
        parentKey = node[keyField.value]
      } else if (getParentKey(key, node[childrenField.value])) {
        parentKey = getParentKey(key, node[childrenField.value])
      }
    }
  }
  return parentKey
}

const onExpand = (keys: number[]) => {
  expandedKeys.value = keys
  autoExpandParent.value = false
}

const onSelected = (keys: number[], event: any) => {
  selectedKeys.value = keys
  emit('select', keys, event)
}

const onRightClick = ({ event, node }: any) => {
  emit('rightClick', { event, node })
}

const onChecked = (keys: number[], event: any) => {
  emit('check', keys, event)
}

const onLoad = (loadedKeys: number[], event: any) => {
  emit('load', loadedKeys, event)
}

defineExpose({
  selectedKeys,
  expandedKeys,
  treeInsance,
})
</script>

<style lang="less" scoped>
.ym-tree-wrapper {
  .ant-input-search {
    margin-bottom: 14px;
  }
}
</style>
