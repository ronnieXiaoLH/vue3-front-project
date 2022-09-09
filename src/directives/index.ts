import { App } from 'vue'
import lazy from './modules/lazy'

export default {
  install(app: App) {
    // app.directive('lazy', lazy)
    const directives = import.meta.glob('./modules/*.ts', { eager: true })
    for (const [key, value] of Object.entries(directives)) {
      const arr = key.split('/')
      const name = arr[arr.length - 1].replace('.ts', '')
      app.directive(name, value.default)
    }
  },
}
