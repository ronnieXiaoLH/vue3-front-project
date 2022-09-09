import { useIntersectionObserver } from '@vueuse/core'

export default {
  mounted(el: HTMLImageElement) {
    // 1. 拿到 img 的 src
    const imgSrc = el.src
    // 2. 将 img 标签的 scr 置为空
    el.src = ''
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      // 3. 当 img 标签可见时，再将 img 的 src 置为原始值，加载图片
      if (isIntersecting) {
        el.src = imgSrc
        // 4. 停止监听
        stop()
      }
    })
  },
}
