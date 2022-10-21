import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件件
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定 symbolId 格式
      symbolId: 'icon-[name]',
    }),
  ],
  server: {
    proxy: {
      '/pexels': {
        target: 'https://www.pexels.com/zh-cn/api/v3/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pexels/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
