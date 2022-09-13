<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1">
      所有分类
    </h2>
    <ul class="overflow-y-auto">
      <li
        class="
          text-lg text-zinc-900
          dark:text-zinc-300
          px-1
          py-1.5
          duration-200
          active:bg-zinc-100
          dark:active:bg-zinc-900
        "
        v-for="item in $store.getters['category/categorys']"
        :key="item.id"
        @click="clickItem(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script lang='ts' setup>
import { CategoryItem } from '../../../../store/modules/category'

const props = defineProps({
  currentCategoryIndex: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits(['onClickItem'])

const clickItem = (category: CategoryItem) => {
  emits('onClickItem', category)
}
</script>
<style  lang='scss' scoped>
</style>