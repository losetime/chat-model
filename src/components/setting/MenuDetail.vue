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
      <a-form-item label="上级菜单" v-bind="validateInfos.parentId">
        <a-tree-select
          v-model:value="detailInfo.parentId"
          show-search
          :field-names="fieldNames"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择上级菜单"
          allow-clear
          :tree-data="menuTreeOptions"
        />
      </a-form-item>
      <a-form-item label="菜单类型" v-bind="validateInfos.menuType">
        <a-radio-group v-model:value="detailInfo.menuType">
          <a-radio value="M">目录</a-radio>
          <a-radio value="C">菜单</a-radio>
          <a-radio value="F">按钮</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="菜单名称" v-bind="validateInfos.menuName">
        <a-input v-model:value="detailInfo.menuName" placeholder="请输入菜单名称" />
      </a-form-item>
      <a-form-item label="显示排序" v-bind="validateInfos.orderNum">
        <a-input-number v-model:value="detailInfo.orderNum" placeholder="请输入显示排序" />
      </a-form-item>
      <a-form-item label="路由地址" v-bind="validateInfos.path" v-if="detailInfo.menuType !== 'F'">
        <a-input v-model:value="detailInfo.path" placeholder="请输入路由地址" />
      </a-form-item>
      <a-form-item label="路由名称" v-bind="validateInfos.routerName" v-if="detailInfo.menuType !== 'F'">
        <a-input v-model:value="detailInfo.routerName" placeholder="请输入路由名称" />
      </a-form-item>
      <a-form-item label="路由等级" v-bind="validateInfos.level" v-if="detailInfo.menuType !== 'F'">
        <a-input-number v-model:value="detailInfo.level" placeholder="请输入路由等级" />
      </a-form-item>
      <a-form-item label="组件路径" v-bind="validateInfos.component" v-if="detailInfo.menuType === 'C'">
        <a-input v-model:value="detailInfo.component" placeholder="请输入组件路径" />
      </a-form-item>
      <a-form-item label="菜单图标" v-bind="validateInfos.icon" v-if="detailInfo.menuType !== 'F'">
        <a-input v-model:value="detailInfo.icon" placeholder="请选择菜单图标" />
      </a-form-item>
      <a-form-item label="权限标识" v-bind="validateInfos.perms">
        <a-input v-model:value="detailInfo.perms" placeholder="请输入权限标识" />
      </a-form-item>
      <a-form-item label="是否外链" v-bind="validateInfos.isFrame" v-if="detailInfo.menuType !== 'F'">
        <a-radio-group v-model:value="detailInfo.isFrame">
          <a-radio value="0">是</a-radio>
          <a-radio value="1">否</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="显示状态" v-bind="validateInfos.visible" v-if="detailInfo.menuType !== 'F'">
        <a-radio-group v-model:value="detailInfo.visible">
          <a-radio value="0">显示</a-radio>
          <a-radio value="1">隐藏</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="菜单状态" v-bind="validateInfos.status" v-if="detailInfo.menuType !== 'F'">
        <a-radio-group v-model:value="detailInfo.status">
          <a-radio value="0">启用</a-radio>
          <a-radio value="1">停用</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="是否缓存" v-bind="validateInfos.isCache" v-if="detailInfo.menuType === 'C'">
        <a-radio-group v-model:value="detailInfo.isCache">
          <a-radio value="0">缓存</a-radio>
          <a-radio value="1">不缓存</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import { Form, message } from 'ant-design-vue'
import { menuDetailRules } from '@/validator/setting'
import { actionTypeEnum } from '@/enums/commonEnum'
import { apiGetMenuTree, apiAddMenuDetail, apiUpdateMenuDetail, apiGetMenuDetail } from '@/service/api/setting'

const props = defineProps<{
  handleRefresh: Function
  getSourceData: Function
}>()

const labelCol = { span: 4 }

const visible = ref<boolean>(false)

const title = ref<string>('添加菜单')

const handleType = ref(actionTypeEnum.ADD)

const fieldNames = ref({
  title: 'label',
  value: 'id',
})

const detailInfo = reactive<any>({
  parentId: '',
  menuType: 'C',
  icon: '',
  menuName: '',
  orderNum: 0,
  isFrame: '1',
  path: '',
  routerName: '',
  level: 0,
  component: '',
  visible: '0',
  status: '0',
  isCache: '0',
  perms: '',
})

const menuId = ref<number>(-1)

const menuTreeOptions = ref<any[]>([])

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, menuDetailRules)

/**
 * @desc 初始化对话框
 */
const initModal = async (type: number, initInfo: any) => {
  handleType.value = type
  await getMenuTreeOptions()
  if (type === actionTypeEnum.EDIT) {
    title.value = '修改菜单'
    menuId.value = initInfo.menuId as number
    await getMenuDetail()
  }
  visible.value = true
}

/**
 * @desc 获取所有菜单树
 */
const getMenuTreeOptions = async () => {
  const { code, data } = await apiGetMenuTree()
  if (code === 20000) {
    menuTreeOptions.value = [
      {
        label: '主类目',
        id: 0,
        children: data,
      },
    ]
  }
}

/**
 * @desc 获取角色详情
 */
const getMenuDetail = async () => {
  const { code, data } = await apiGetMenuDetail({ menuId: menuId.value })
  if (code === 20000) {
    const {
      parentId,
      menuType,
      icon,
      menuName,
      orderNum,
      isFrame,
      path,
      routerName,
      level,
      component,
      visible,
      status,
      perms,
    } = data
    Object.assign(detailInfo, {
      parentId,
      menuType,
      icon,
      menuName,
      orderNum: parseInt(orderNum),
      isFrame,
      path,
      routerName,
      level,
      component,
      visible,
      status,
      perms,
    })
  }
}

/**
 * @desc 确认
 */
const handleConfirm = () => {
  const validateField = Object.keys(toRaw(detailInfo)).filter((val: string) => val !== 'component')
  const isMenu = detailInfo.menuType === 'C'
  if (isMenu) {
    validateField.push('component')
  }
  validate(validateField).then(async () => {
    if (handleType.value === actionTypeEnum.ADD) {
      const { code } = await apiAddMenuDetail({ ...detailInfo })
      if (code === 20000) {
        message.success('添加菜单成功')
        props.handleRefresh()
      }
    } else {
      const { code } = await apiUpdateMenuDetail({ ...detailInfo, menuId: menuId.value })
      if (code === 20000) {
        message.success('更新菜单成功')
        props.getSourceData()
      }
    }
    handleCancel()
  })
}

/**
 * @desc 关闭
 */
const handleCancel = () => {
  resetFields()
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
