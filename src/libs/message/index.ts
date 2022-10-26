import { h, render } from 'vue'
import MessageComponent from './index.vue'

interface Options {
  type: string
  message: string
  duration?: number
}

export const message = (options: Options) => {
  const destory = () => {
    // 3. 把渲染的 vnode 从 document.body 中移除
    render(null, document.body)
  }
  // 1. 生成 vnode
  const vnode = h(MessageComponent, {
    type: options.type,
    message: options.message,
    duration: options.duration,
    destory,
  })

  // 2. 渲染
  render(vnode, document.body)
}
