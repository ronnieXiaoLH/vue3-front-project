import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MLibs from './libs'
import './styles/index.scss'
import { useREM } from './utils/flexible'
// 注册 svg-icons
import 'virtual:svg-icons-register'

useREM()

createApp(App).use(router).use(store).use(MLibs).mount('#app')
