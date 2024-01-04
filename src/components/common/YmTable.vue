<template>
  <div ref="tableInstance" class="ym-table-wrapper">
    <a-table
      :row-selection="rowSelection"
      :columns="columns"
      :data-source="tableData.result"
      :row-key="(record: any) => record[rowKey]"
      :loading="tableData.loading"
      :scroll="{ y: ymHeight }"
      :pagination="pagination"
      size="small"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'serialNumber'">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-else-if="column.key === 'action'">
          <slot name="action" :index="index" :record="record"></slot>
        </template>
        <template v-else>
          <slot :name="column.key" :index="index" :record="record"></slot>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, unref, onMounted } from 'vue'
import useTable from '@/hooks/useTable'

interface Props {
  rowKey: string
  columns: Array<any>
  pagination?: boolean
  rowSelection?: boolean
  params?: Object
  isImmediately?: boolean
  getTableList: Function
  // 设置禁用选择框条件
  getCheckboxProps?: Function
  // 当表格翻页时仍然保留选项的 key
  preserveSelectedRowKeys?: boolean
  // 默认选择值
  defalutSelectedRows?: any[]
}

const props = withDefaults(defineProps<Props>(), {
  pagination: true,
  rowSelection: false,
  isImmediately: true,
  preserveSelectedRowKeys: false,
})

const tableInstance = ref()

const ymHeight = ref('')

const selectedRowKeys = ref<number[]>([])

const selectedRows = ref<any[]>([])

const { tableData, reqParams, getSourceData, handleRefresh, onChangeSize, handleReacquire } = useTable(
  props.getTableList,
  props.params,
  props.isImmediately,
)

onMounted(() => {
  if (props.defalutSelectedRows) {
    selectedRows.value = props.defalutSelectedRows
    selectedRowKeys.value = props.defalutSelectedRows.map((item: any) => item[props.rowKey])
  }
  setDomClientView()
  window.addEventListener('resize', function () {
    const timeout = setTimeout(() => {
      setDomClientView()
      clearTimeout(timeout)
    }, 200)
  })
})

const setDomClientView = () => {
  if (!tableInstance.value) return
  const parentNode = tableInstance.value.parentNode
  const paddingTop = parseInt(getComputedStyle(parentNode)['paddingTop'].slice(0, -2))
  const paddingLeft = parseInt(getComputedStyle(parentNode)['paddingLeft'].slice(0, -2))
  const height = parentNode.clientHeight - paddingTop * 2 - 40
  if (pagination.value) {
    ymHeight.value = height - 56 + 'px'
  } else {
    ymHeight.value = height + 'px'
  }
  const emptyNode: any = document.getElementsByClassName('ym-table-wrapper')[0]
  emptyNode.style.height = ymHeight.value
  tableInstance.value.style.width = parentNode.clientWidth - paddingLeft * 2 + 'px'
}

// 是否需要分页器
const pagination = computed(() =>
  props.pagination
    ? {
        current: reqParams.current,
        pageSize: reqParams.size,
        total: tableData.total,
        showTotal: (total: any) => `共${total}条`,
        onChange: handleReacquire,
        showQuickJumper: true,
        showSizeChanger: true,
        onShowSizeChange: (_current: number, pageSize: number) => {
          onChangeSize(pageSize)
        },
      }
    : props.pagination,
)

// 是否需要多选
const rowSelection = computed(() =>
  props.rowSelection
    ? {
        selectedRowKeys: unref(selectedRowKeys),
        onChange: onSelectChange,
        getCheckboxProps: getCheckboxProps,
      }
    : null,
)

/**
 * @desc 监听多选
 */
const onSelectChange = (keys: number[], rows: any[]) => {
  selectedRowKeys.value = keys
  selectedRows.value = rows
}

/**
 * @desc 设置chexkbox禁用
 */
const getCheckboxProps = (record: any) => {
  if (props.getCheckboxProps) {
    return props.getCheckboxProps(record)
  } else {
    return null
  }
}

defineExpose({
  reqParams,
  tableData,
  selectedRowKeys,
  selectedRows,
  getSourceData,
  handleRefresh,
  handleReacquire,
})
</script>
<style lang="less" scoped>
.ym-table-wrapper {
  position: absolute;
  ::v-deep(.ant-table-body) {
    overflow-y: auto !important;
    .ant-table-placeholder {
      .ant-table-cell {
        border-bottom: none;
      }
    }
  }
}
</style>
