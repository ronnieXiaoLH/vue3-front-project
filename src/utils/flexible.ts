import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { PC_DEVICE_WIDTH } from '@/constants'

export const isMobileTermial = computed(() => {
  return useWindowSize().width.value < PC_DEVICE_WIDTH
})

export const useREM = () => {
  // 最大的 fontSize
  const MAX_FONT_SIZE = 40
  // 监听 html 文档被解析完成的事件
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html') as HTMLElement
    // 计算 fontSize
    let fontSize = Math.min(window.innerWidth / 10, MAX_FONT_SIZE)
    html.style.fontSize = fontSize + 'px'
  })
}
