import { createApp } from 'vue'
import './style.less'
// import 'ant-design-vue/lib/message/style/index.less'
// import 'ant-design-vue/lib/modal/style/index.less'
import Antd from 'ant-design-vue'
import App from './App.vue'
import { router } from '@/router'
import { setupStore } from '@/store'
import { setPermissionDirective } from '@/directive/permission'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)
app.use(Antd)
app.use(router)
setupStore(app)
app.mount('#app')
setPermissionDirective(app)

app.config.errorHandler = function (err, vm, info) {
  console.log(err, vm, info)
}
