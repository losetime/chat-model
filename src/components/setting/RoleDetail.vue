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
      <a-form-item label="角色名称" v-bind="validateInfos.roleName">
        <a-input v-model:value="detailInfo.roleName" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="权限名称" v-bind="validateInfos.roleKey">
        <a-input v-model:value="detailInfo.roleKey" placeholder="请输入权限名称" />
      </a-form-item>
      <a-form-item label="角色顺序" v-bind="validateInfos.roleSort">
        <a-input-number v-model:value="detailInfo.roleSort" placeholder="请输入角色顺序" />
      </a-form-item>
      <a-form-item label="状态" v-bind="validateInfos.status">
        <a-radio-group v-model:value="detailInfo.status">
          <a-radio value="0">启用</a-radio>
          <a-radio value="1">停用</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="菜单权限">
        <ym-tree
          :tree-data="menuTreeOptions"
          :field-names="fieldNames"
          :show-search="false"
          :checkable="true"
          :defaultChecked="detailInfo.menuIds"
          ref="ymTreeInstance"
          @check="onCheckedNode"
        />
      </a-form-item>
      <a-form-item label="备注" v-bind="validateInfos.remark">
        <a-textarea v-model:value="detailInfo.remark" placeholder="请输入备注" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import YmTree from '../common/YmTree.vue'
import { Form, message } from 'ant-design-vue'
import { roleDetailRules } from '@/validator/setting'
import { actionTypeEnum } from '@/enums/commonEnum'
import {
  apiGetMenuTree,
  apiGetSelectedMenuTree,
  apiAddRole,
  apiUpdateRole,
  apiGetRoleDetail,
} from '@/service/api/setting'

const props = defineProps<{
  handleRefresh: Function
  getSourceData: Function
}>()

const labelCol = { span: 4 }

const visible = ref<boolean>(false)

const title = ref<string>('添加角色')

const handleType = ref(actionTypeEnum.ADD)

const fieldNames = ref({
  title: 'label',
  key: 'id',
})

const detailInfo = reactive<any>({
  roleName: '',
  roleKey: '',
  roleSort: 0,
  status: '0',
  menuIds: [],
  menuCheckStrictly: true,
  remark: '',
})

const roleId = ref<number>(-1)

const menuTreeOptions = ref([])

const ymTreeInstance = ref<any>(null)

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, roleDetailRules)

/**
 * @desc 初始化对话框
 */
const initModal = async (type: number, initInfo: any) => {
  handleType.value = type
  if (type === actionTypeEnum.ADD) {
    getMenuTreeOptions()
  } else {
    title.value = '修改角色'
    roleId.value = initInfo.roleId as number
    await getSelectedMenuTree()
    await getRoleDetail()
  }
  visible.value = true
}

/**
 * @desc 获取所有菜单树
 */
const getMenuTreeOptions = async () => {
  const { code, data } = await apiGetMenuTree()
  if (code === 20000) {
    menuTreeOptions.value = data
  }
}

/**
 * @desc 获取角色已选择菜单树
 */
const getSelectedMenuTree = async () => {
  const { code, data } = await apiGetSelectedMenuTree({ roleId: roleId.value })
  if (code === 20000) {
    menuTreeOptions.value = data.menus
    detailInfo.menuIds = data.checkedKeys
  }
}

/**
 * @desc 获取角色详情
 */
const getRoleDetail = async () => {
  const { code, data } = await apiGetRoleDetail({ roleId: roleId.value })
  if (code === 20000) {
    const { roleName, roleKey, roleSort, status, remark } = data
    Object.assign(detailInfo, {
      roleName,
      roleKey,
      roleSort: parseInt(roleSort),
      status,
      remark,
    })
  }
}

/**
 * @desc 选中树节点
 */
const onCheckedNode = async (keys: number[]) => {
  detailInfo.menuIds = keys
}

/**
 * @desc 确认
 */
const handleConfirm = () => {
  validate().then(async () => {
    const treeInsance = ymTreeInstance.value.treeInsance
    const checkedKeys = treeInsance.checkedKeys
    const halfCheckedKeys = treeInsance.halfCheckedKeys
    const menuIds = [...checkedKeys, ...halfCheckedKeys]
    if (handleType.value === actionTypeEnum.ADD) {
      const { code } = await apiAddRole({ ...detailInfo, menuIds })
      if (code === 20000) {
        message.success('添加角色成功')
        props.handleRefresh()
        handleCancel()
      }
    } else {
      const { code } = await apiUpdateRole({ ...detailInfo, roleId: roleId.value, menuIds })
      if (code === 20000) {
        message.success('更新角色成功')
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
  title.value = '添加角色'
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
    .ym-tree-wrapper {
      height: 250px;
      padding: 8px;
      box-sizing: border-box;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      overflow-y: auto;
    }
  }
}
</style>
