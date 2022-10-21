import { App, defineAsyncComponent } from 'vue'
export { confirm } from './confirm'
export { message } from './message'

export default {
  install(app: App) {
    const components = import.meta.glob('./*/index.vue')
    for (const [fullPath, fn] of Object.entries(components)) {
      const componentName = 'm-' + fullPath.replace('./', '').split('/')[0]
      app.component(componentName, defineAsyncComponent(fn))
    }
  },
}
