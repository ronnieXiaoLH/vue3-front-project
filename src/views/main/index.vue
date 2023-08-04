<template>
  <div
    class="
      h-full
      overflow-auto
      bg-white
      dark:bg-zinc-800
      duration-500
      scrollbar-thin scrollbar-thumb-transparent
      xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900
      scrollbar-track-transparent
    "
  >
    <navigation-vue></navigation-vue>
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list-vue></list-vue>
    </div>

    <!-- 移动端：tabbar -->
    <m-trigger-menu
      v-if="isMobileTermial"
      class="fixed left-0 right-0 mx-auto w-[220px] bottom-6"
    >
      <m-trigger-menu-item
        icon="home"
        iconClass="fill-zinc-900 dark:fill-zinc-200"
        >首页
      </m-trigger-menu-item>
      <m-trigger-menu-item
        icon="vip"
        iconClass="fill-zinc-900 dark:fill-zinc-200"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onVipClick"
        >VIP
      </m-trigger-menu-item>
      <m-trigger-menu-item
        icon="profile"
        iconClass="fill-zinc-900 dark:fill-zinc-200"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onMyClick"
        >我的
      </m-trigger-menu-item>
    </m-trigger-menu>
  </div>
</template>
<script lang='ts' setup>
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
import { isMobileTermial } from '../../utils/flexible'
import { useRouter } from 'vue-router'

const router = useRouter()

const onVipClick = () => {}

const onMyClick = () => {
  router.push('/profile')
}
</script>
<style  lang='scss' scoped>
</style>