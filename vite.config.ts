import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需加载组件，不用显示手动导入
// import Components from 'unplugin-vue-components/vite'
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

export default ({ mode }) => {
  console.log(`当前环境：${mode}`)
  return defineConfig({
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
      ],
    },
    plugins: [vue()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        // 线上开发
        '/usermanager': 'http://192.168.35.178:8090',
        '/person': 'http://192.168.35.178:8090',
        '/car': 'http://192.168.35.178:8090',
        '/safety': 'http://192.168.35.178:8090',
        '/uav': 'http://192.168.35.178:8090',
        '/vrserver': 'http://192.168.35.178:8090',
        // 晓鹏本地
        // '/usermanager': 'http://192.168.35.229:8090',
        // '/person': 'http://192.168.35.229:8090',
        // '/car': 'http://192.168.35.229:8090',
        // '/safety': 'http://192.168.35.229:8090',
        // '/uav': 'http://192.168.35.229:8090',
        // '/vrserver': 'http://192.168.35.229:8090',
      },
    },
  })
}
