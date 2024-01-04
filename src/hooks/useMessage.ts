import { message, Modal } from 'ant-design-vue'

export default function useMessage() {
  return {
    createMessage: message,
    createModal: Modal,
  }
}
