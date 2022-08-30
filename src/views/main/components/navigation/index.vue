<template>
  <mobile-navigation-vue v-if="isMobileTermial"></mobile-navigation-vue>
  <pc-navigation-vue v-else></pc-navigation-vue>
</template>
<script lang='ts' setup>
import { ref } from 'vue'
import { isMobileTermial } from '@/utils/flexible'
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'
import { useStore } from 'vuex'

const store = useStore()
store.dispatch('category/useCategoryData')
</script>
<style  lang='scss' scoped>
</style>