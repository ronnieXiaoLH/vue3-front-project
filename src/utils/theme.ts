import { watch } from 'vue'
import store from '../store'

export default () => {
  watch(() => store.getters['theme/themeType'], changeTheme, {
    immediate: true,
  })
}

const changeTheme = (theme: 'light' | 'dark' | 'system') => {
  if (theme === 'system') {
    watchSystemThemeChange()
    theme = matchMedia!.matches ? 'dark' : 'light'
  }
  const html = (document.querySelector('html')!.className = theme)
}

// 监听系统主题变更
let matchMedia: MediaQueryList | null
const watchSystemThemeChange = () => {
  if (matchMedia) return // 保证只触发一次
  matchMedia = window.matchMedia('(perfers-color-scheme: dark)')
  matchMedia.onchange = () => {
    changeTheme('system')
  }
}
