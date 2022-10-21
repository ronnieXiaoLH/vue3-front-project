import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MLibs from './libs'
import MDirectives from './directives'
import './styles/index.scss'
import { useREM } from './utils/flexible'
import useTheme from './utils/theme'
import { message } from './libs/message'
// 注册 svg-icons
import 'virtual:svg-icons-register'

useREM()
useTheme()

const app = createApp(App).use(router).use(store).use(MDirectives).use(MLibs)
app.config.globalProperties.$message = message
app.mount('#app')
