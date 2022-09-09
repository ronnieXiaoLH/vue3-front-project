import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MLibs from './libs'
import MDirectives from './directives'
import './styles/index.scss'
import { useREM } from './utils/flexible'
import useTheme from './utils/theme'
// 注册 svg-icons
import 'virtual:svg-icons-register'

useREM()
useTheme()

createApp(App).use(router).use(store).use(MDirectives).use(MLibs).mount('#app')
