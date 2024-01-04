import { reactive, onMounted } from 'vue'
import { formatParams } from '@/utils/base'

/**
 * @desc 表格逻辑
 * @param isImmediately 是否立即执行
 */
const useTable = (getTableData: Function, tableParams?: Object, isImmediately?: boolean) => {
  const tableData = reactive({
    result: [],
    total: 0,
    loading: false,
  })

  const reqParams = reactive({
    current: 1,
    size: 20,
  })

  const onChangeSize = (size: number) => {
    reqParams.size = size
  }

  const handleRefresh = () => {
    reqParams.current = 1
    getSourceData()
  }

  const getSourceData = () => {
    tableData.loading = true
    const tempParams = formatParams({ ...tableParams })
    const params = Object.keys(tempParams).length > 0 ? { ...reqParams, ...tempParams } : reqParams
    getTableData(params).then((res: any) => {
      tableData.loading = false
      if (res.code === 20000) {
        if (Array.isArray(res.data)) {
          tableData.result = res.data
          tableData.total = res.data.length
        } else {
          if (res.data.records.length <= 0 && reqParams.current > 1) {
            reqParams.current -= 1
            getSourceData()
          } else {
            tableData.result = res.data.records
            tableData.total = res.data.total
          }
        }
      }
    })
  }

  /**
   * @desc 重新请求
   */
  const handleReacquire = (page?: number) => {
    if (typeof page === 'number') {
      reqParams.current = page
    }
    getSourceData()
  }

  onMounted(() => {
    if (isImmediately) {
      getSourceData()
    }
  })

  return {
    tableData,
    reqParams,
    handleRefresh,
    getSourceData,
    onChangeSize,
    handleReacquire,
  }
}

export default useTable
