import { h, render } from 'vue'
import ConfirmComponent from './index.vue'

interface Options {
  cancelBtnText: string
  confirmBtnText: string
}

export const confirm = (
  title?: string,
  content?: string,
  options?: Options
) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title
      title = ''
    }

    const cancalBtnHandler = () => {
      reject(new Error('取消按钮点击'))
    }

    const confirmBtnHandler = () => {
      resolve('')
    }

    const close = () => {
      // 3. 把渲染的 vnode 去掉
      render(null, document.body)
    }

    // 1. 生成 vnode
    const vnode = h(ConfirmComponent, {
      title,
      content,
      cancelBtnText: options?.cancelBtnText,
      confirmBtnText: options?.confirmBtnText,
      cancalBtnHandler,
      confirmBtnHandler,
      close,
    })

    // 2. 渲染
    render(vnode, document.body)
  })
}

interface Text {
  c: string
  d: string
}

const text = (a: string, b: string, options: Text) => {
  options
}
