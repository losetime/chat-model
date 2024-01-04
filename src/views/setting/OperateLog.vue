<template>
  <div class="audit-log-wrapper">
    <div class="visit-statistics-wrap">
      <div class="title-wrap">访问统计</div>
      <div class="visit-chart">
        <Line
          :xAxis="visitStatisticsData?.xAxis || []"
          :series="visitStatisticsData?.series || []"
          :color="['#47cab7']"
          domId="learning-star"
        />
      </div>
    </div>
    <div class="search-wrap">
      <a-form layout="inline" :model="searchParams">
        <a-form-item label="操作人">
          <a-input v-model:value="searchParams.operName" placeholder="请输入操作人" />
        </a-form-item>
        <a-form-item label="事件类型">
          <a-select
            v-model:value="searchParams.logEventType"
            placeholder="请选择事件类型"
            allowClear
            :options="IncidentTypeOptions"
          />
        </a-form-item>
        <a-form-item label="业务类型">
          <a-select
            v-model:value="searchParams.businessType"
            placeholder="请选择业务类型"
            allowClear
            :options="BusinessTypeOptions"
          />
        </a-form-item>
        <a-form-item label="是否异常">
          <a-select
            v-model:value="searchParams.status"
            placeholder="请选择是否异常"
            allowClear
            :options="OperateLogAbnormalOptions"
          />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleReacquire(1)">查询</a-button>
            <a-button @click="handleResetSearch">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="handle-wrap">
      <a-space>
        <a-button type="primary" @click="handleExport" v-permission="{ key: 'system:oper:export' }">导出</a-button>
      </a-space>
    </div>
    <div class="custom-table-wrap">
      <ym-table
        rowKey="userId"
        :columns="operateLogColumn"
        :getTableList="getUserList"
        :isImmediately="false"
        :row-selection="false"
        table-x="max-content"
        ref="tableInstance"
      >
        <template #action="{ record }">
          <a-space>
            <a-button
              type="link"
              size="small"
              @click="handleCheckDetail(record)"
              v-permission="{ key: 'system:oper:query' }"
              >详情</a-button
            >
          </a-space>
        </template>
      </ym-table>
    </div>
    <logs-detail ref="detailInstance" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import LogsDetail from '@/components/setting/LogsDetail.vue'
import { apiGetOperateLogRecord, apiExportLogs, apiGetVisitStatisticInfo } from '@/service/api/setting'
import { operateLogColumn } from '@/columns/setting'
import { IncidentTypeOptions, OperateLogAbnormalOptions, BusinessTypeOptions } from '@/enums/settingEnum'
import Line from '@/components/charts/Line.vue'

onMounted(() => {
  getVisitStatisticsData()
  handleReacquire(1)
})

const visitStatisticsData = ref<any>({
  series: [],
  xAxis: [],
})

const getVisitStatisticsData = async () => {
  const { code, data } = await apiGetVisitStatisticInfo({ daysFromToday: 7 })
  if (code === 20000) {
    const xAxis = []
    const seriesData = []
    for (let key in data) {
      xAxis.push(key)
      seriesData.push(data[key])
    }
    visitStatisticsData.value = {
      series: [
        {
          data: seriesData,
          type: 'line',
          name: '访问统计',
        },
      ],
      xAxis: xAxis,
    }
  }
}

/**
 ********************************* 表格逻辑 ******************************************
 */

// 表格实例
const tableInstance = ref()

// 搜索参数
const searchParams = reactive<any>({
  operName: '',
  logEventType: null,
  businessType: null,
  status: null,
})

// 重新获取列表
const handleReacquire = (page?: number) => {
  tableInstance.value.handleReacquire(page)
}

const handleResetSearch = () => {
  Object.assign(searchParams, {
    operName: '',
    logEventType: null,
    businessType: null,
    status: null,
  })
  handleReacquire(1)
}

/**
 * @desc 获取用户列表
 */
const getUserList = async () => {
  const { current, size } = tableInstance.value.reqParams
  const { code, rows, total } = await apiGetOperateLogRecord({
    pageSize: size,
    pageNum: current,
    ...searchParams,
  })
  console.log(rows)
  return Promise.resolve({
    code,
    data: {
      records: rows,
      total,
    },
  })
}

/**
 * @desc 导出
 */
const handleExport = () => {
  apiExportLogs()
}

const detailInstance = ref()

/**
 * @desc 查看详情
 */
const handleCheckDetail = (record: any) => {
  detailInstance.value.initModal(record)
}
</script>

<style lang="less" scoped>
.audit-log-wrapper {
  .visit-statistics-wrap {
    padding: 32px;
    background-color: #ffffff;
    .title-wrap {
      font-size: 18px;
      font-weight: bold;
    }
    .visit-chart {
      height: 300px;
    }
  }
  .search-wrap {
    padding: 32px;
    background-color: #ffffff;
    margin-top: 14px;

    ::v-deep(.ant-form) {
      display: grid;
      grid-template-columns: repeat(4, 23%);
      grid-row-gap: 20px;
      grid-column-gap: 0px;

      .ant-form-item-label {
        min-width: 80px;
      }
    }
  }
  .handle-wrap {
    padding: 32px 32px 0 32px;
    background-color: #ffffff;
    margin-top: 14px;
  }
  .custom-table-wrap {
    height: calc(100% - 228px);
    padding: 32px;
    background-color: #ffffff;
    position: relative;
  }
}
</style>
