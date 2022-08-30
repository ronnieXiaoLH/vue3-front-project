<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 font-bold mb-2 px-1">所有分类</h2>
    <ul class="overflow-y-auto">
      <li
        class="text-lg text-zinc-900 px-1 py-1.5 duration-200"
        v-for="(item, index) in $store.getters['category/categorys']"
        :key="item.id"
        @click="clickItem(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script lang='ts' setup>
const props = defineProps({
  currentCategoryIndex: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits(['onClickItem'])

const clickItem = (index: number) => {
  emits('onClickItem', index)
}
</script>
<style  lang='scss' scoped>
</style>