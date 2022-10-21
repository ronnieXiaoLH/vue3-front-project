<template>
  <m-popover placement="bottom-left">
    <template #reference>
      <m-svg-icon
        class="
          guide-theme
          w-4
          h-4
          p-1
          cursor-pointer
          rounded-sm
          duration-200
          outline-none
          hover:bg-zinc-100/60
          dark:hover:bg-zinc-900
        "
        fillClass="fill-zinc-900 dark:fill-zinc-300"
        :name="svgIconName"
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
          dark:hover:bg-zinc-800
        "
        v-for="item in themeList"
        :key="item.id"
        @click="clickItem(item.type)"
      >
        <m-svg-icon
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
          :name="item.icon"
        ></m-svg-icon>
        <span class="text-zinc-900 dark:text-zinc-300 text-sm">{{
          item.text
        }}</span>
      </div>
    </div>
  </m-popover>
</template>
<script lang='ts' setup>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import useTheme from '@/utils/theme'

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
    type: 'light',
    text: '极夜白',
  },
  {
    id: 1,
    icon: 'theme-dark',
    type: 'dark',
    text: '极夜黑',
  },
  {
    id: 2,
    icon: 'theme-system',
    type: 'system',
    text: '跟随系统',
  },
]

const store = useStore<GlobalDataProps>()

const clickItem = (themeType: string) => {
  store.commit('theme/changeThemeType', themeType)
  useTheme()
}

const svgIconName = computed(
  () =>
    themeList.find((item) => item.type === store.getters['theme/themeType'])
      ?.icon
)
</script>
<style  lang='scss' scoped>
</style>