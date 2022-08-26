<template>
  <mobile-navigation-vue
    v-if="isMobileTermial"
    :data="categorys"
  ></mobile-navigation-vue>
  <pc-navigation-vue v-else :data="categorys"></pc-navigation-vue>
</template>
<script lang='ts' setup>
import { ref } from 'vue'
import { isMobileTermial } from '@/utils/flexible'
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'
import { getCategory } from '@/api/category'
import { CategoryItem } from './types'
import { ALL_CATEGORY_ITEM } from '@/constants'

const categorys = ref<CategoryItem[]>([])

const getCategoryData = async () => {
  try {
    const data = await getCategory()
    categorys.value = data.categorys
    categorys.value.unshift(ALL_CATEGORY_ITEM)
  } catch (error) {}
}

getCategoryData()
</script>
<style  lang='scss' scoped>
</style>