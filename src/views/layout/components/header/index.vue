<template>
  <div
    class="
      w-full
      bg-white
      dark:bg-zinc-800
      border-b border-b-zinc-200
      dark:border-b-zinc-700
      px-2
      py-1
    "
  >
    <div class="flex items-center">
      <img
        class="guide-home h-4 cursor-pointer mr-2"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        @click="goToHome"
      />
      <search-vue class="mr-1"></search-vue>
      <theme-vue class="mr-1"></theme-vue>
      <my-vue></my-vue>
    </div>
  </div>
</template>
<script lang='ts' setup>
import searchVue from './header-search/index.vue'
import themeVue from './header-theme/index.vue'
import myVue from './header-my/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}
</script>
<style  lang='scss' scoped>
</style>