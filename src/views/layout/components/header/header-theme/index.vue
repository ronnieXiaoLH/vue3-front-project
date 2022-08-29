<template>
  <m-popover placement="bottom-left">
    <template #reference>
      <m-svg-icon
        class="
          w-4
          h-4
          p-1
          cursor-pointer
          rounded-sm
          duration-200
          outline-none
          hover:bg-zinc-100/60
        "
        fillClass="fill-zinc-900"
        name="theme-light"
      ></m-svg-icon>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        class="
          flex
          items-center
          p-1
          cursor-pointer
          rounded
          hover:bg-zinc-100/60
        "
        v-for="item in themeList"
        :key="item.id"
      >
        <m-svg-icon
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900"
          :name="item.icon"
        ></m-svg-icon>
        <span class="text-zinc-900 text-sm">{{ item.text }}</span>
      </div>
    </div>
  </m-popover>
</template>
<script lang='ts' setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'

interface ThemeItem {
  id: number
  icon: string
  type: string
  text: string
}
const themeList: ThemeItem[] = [
  {
    id: 0,
    icon: 'theme-light',
    type: THEME_LIGHT,
    text: '极夜白',
  },
  {
    id: 1,
    icon: 'theme-dark',
    type: THEME_DARK,
    text: '极夜白',
  },
  {
    id: 2,
    icon: 'theme-system',
    type: THEME_SYSTEM,
    text: '跟随系统',
  },
]
</script>
<style  lang='scss' scoped>
</style>