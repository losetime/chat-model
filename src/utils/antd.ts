import { createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { isFunction } from 'lodash-es'

export const YmModal = {
  delete: (onOk: Function, onCancel?: Function) => {
    Modal.confirm({
      title: '操作提示',
      content: '是否确定删除？',
      icon: () => createVNode(ExclamationCircleOutlined),
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => onOk(),
      onCancel: () => (onCancel && isFunction(onCancel) ? onCancel() : null),
    })
  },
}
