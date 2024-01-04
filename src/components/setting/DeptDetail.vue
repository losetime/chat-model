<template>
  <a-modal
    v-model:open="visible"
    :title="title"
    :destroyOnClose="true"
    :afterClose="handleCancel"
    @ok="handleConfirm"
    width="600px"
  >
    <a-form :label-col="labelCol" labelAlign="left">
      <a-form-item label="部门编号" v-bind="validateInfos.deptId">
        <a-input v-model:value="detailInfo.deptId" placeholder="请输入部门编号" />
      </a-form-item>
      <a-form-item label="部门名称" v-bind="validateInfos.deptName">
        <a-input v-model:value="detailInfo.deptName" placeholder="请输入部门名称" />
      </a-form-item>
      <a-form-item label="部门类型" v-bind="validateInfos.deptType">
        <a-select
          v-model:value="detailInfo.deptType"
          placeholder="请选择部门类型"
          allowClear
          :options="deptTypeOptions"
        />
      </a-form-item>
      <a-form-item label="上级部门" v-bind="validateInfos.parentId">
        <a-cascader
          v-model:value="detailInfo.parentId"
          :field-names="{ value: 'id' }"
          :options="deptOptions"
          placeholder="请选择上级部门"
          change-on-select
        />
      </a-form-item>
      <a-form-item label="地址" v-bind="validateInfos.adcode">
        <a-cascader
          v-model:value="detailInfo.adcode"
          :field-names="{ value: 'id', label: 'name' }"
          :options="administrativeDivisionOptions"
          placeholder="请选择地址"
          change-on-select
          @change="handleOnAdcode"
        />
      </a-form-item>
      <a-form-item label="联系电话" v-bind="validateInfos.phone">
        <a-input v-model:value="detailInfo.phone" placeholder="请输入联系电话" />
      </a-form-item>
      <a-form-item label="备注" v-bind="validateInfos.remark">
        <a-textarea v-model:value="detailInfo.remark" placeholder="请输入联系电话" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { deptDetailRules } from '@/validator/setting'
import { actionTypeEnum } from '@/enums/commonEnum'
import {
  apiGetDeptDetail,
  apiGetDepartmentList,
  apiAddDept,
  apiUpdateDept,
  apiGetAreaTreeList,
} from '@/service/api/setting'
import { findTreePath } from '@/utils/base'

const props = defineProps<{
  handleRefresh: Function
  getSourceData: Function
}>()

const labelCol = { span: 4 }

const visible = ref<boolean>(false)

const title = ref<string>('添加部门')

const handleType = ref(actionTypeEnum.ADD)

const deptId = ref()

const detailInfo = reactive({
  deptId: '',
  deptName: '',
  deptType: null,
  phone: '',
  parentId: '',
  adcode: '',
  address: '',
  remark: '',
})

const deptOptions = ref()

const deptTypeOptions = [
  {
    label: '省级单位',
    value: 'PROVINCE_UNIT',
  },
  {
    label: '市级单位',
    value: 'CITY_UNIT',
  },
  {
    label: '县区单位',
    value: 'DISTRICT_UNIT',
  },
  {
    label: '部门',
    value: 'DEPARTMENT',
  },
]

const administrativeDivisionOptions = ref<any[]>([])

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, deptDetailRules)

/**
 * @desc 初始化对话框
 */
const initModal = async (type: number, initInfo: any) => {
  handleType.value = type
  await getDepartmentList()
  await getAreaTreeList()
  if (type === actionTypeEnum.EDIT) {
    title.value = '编辑部门'
    deptId.value = initInfo.deptId
    await getDeptDetail(initInfo.deptId)
  }
  visible.value = true
}

/**
 * @desc 获取部门详情
 */
const getDeptDetail = async (deptId: number) => {
  const { code, data } = await apiGetDeptDetail({ deptId })
  if (code === 20000) {
    const { parentId, adcode, ...arg } = data
    // 根据最后一个节点找到上级部门父级节点
    const parentIdArr = findTreePath(deptOptions.value, (val: any) => val.id === parentId, [])
    // 根据最后一个节点找到地址父级节点
    const adcodeArr = findTreePath(administrativeDivisionOptions.value, (val: any) => val.id === adcode, [])
    Object.assign(detailInfo, {
      parentId: parentIdArr,
      adcode: adcodeArr,
      ...arg,
    })
  }
}

/**
 * @desc 获取部门
 */
const getDepartmentList = async () => {
  const { code, data } = await apiGetDepartmentList()
  if (code === 20000) {
    deptOptions.value = data
  }
}

/**
 * @desc 获取行政区划
 */
const getAreaTreeList = async () => {
  const { code, data } = await apiGetAreaTreeList()
  if (code === 20000) {
    administrativeDivisionOptions.value = data
  }
}

/**
 * @desc 监听地址
 */
const handleOnAdcode = (_value: string[], selectedOptions: any) => {
  detailInfo.address = selectedOptions.map((item: any) => item.name).join('')
}

/**
 * @desc 确认
 */
const handleConfirm = () => {
  validate().then(async () => {
    const parentIdLen = detailInfo.parentId.length
    const adcodeLen = detailInfo.adcode.length
    const params = {
      ...detailInfo,
      parentId: detailInfo.parentId[parentIdLen - 1],
      adcode: detailInfo.adcode[adcodeLen - 1],
    }
    if (handleType.value === actionTypeEnum.ADD) {
      const { code } = await apiAddDept(params)
      if (code === 20000) {
        message.success('添加部门成功')
        props.handleRefresh()
        handleCancel()
      }
    } else {
      const { code } = await apiUpdateDept(params)
      if (code === 20000) {
        message.success('更新部门成功')
        props.getSourceData()
        handleCancel()
      }
    }
  })
}

/**
 * @desc 关闭
 */
const handleCancel = () => {
  resetFields()
  title.value = '添加部门'
  visible.value = false
}

defineExpose({
  initModal,
})
</script>

<style lang="less" scoped>
.ant-form {
  .ant-form-item {
    .ant-input-number {
      width: 100%;
    }
  }
}
</style>
