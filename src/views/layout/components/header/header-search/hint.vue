<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="
        py-1
        pl-1
        text-base
        font-bold
        text-zinc-500
        rounded
        cursor-pointer
        duration-300
        hover:bg-zinc-200
        dark:hover:bg-zinc-900
      "
      v-html="highlightText(item)"
      @click="clickItem(item)"
    ></div>
  </div>
</template>
<script lang="ts">
const EMITS_CLICK_ITEM = 'clickItem'
</script>
<script lang='ts' setup>
import { ref } from 'vue'
import axios from 'axios'
import { watchDebounced } from '@vueuse/shared'

const props = defineProps({
  searchText: {
    type: String,
    required: true,
  },
})

const hintData = ref([])

const getHintData = () => {
  if (!props.searchText) return
  axios({
    url: `pexels/search/suggestions/${props.searchText}`,
  }).then((res) => {
    console.log(res)
    hintData.value = res.data.data.attributes.suggestions
  })
}

watchDebounced(
  () => props.searchText,
  () => {
    getHintData()
  },
  {
    immediate: true,
    debounce: 500,
  }
)

const emits = defineEmits([EMITS_CLICK_ITEM])

const clickItem = (value: string) => {
  emits(EMITS_CLICK_ITEM, value)
}

// 处理关键字高亮
const highlightText = (text: string) => {
  // 生成高亮标签
  const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  // 正则表达式：从显示文本中，找出与用户输入文本相同的内容，使用高亮标签进行替换
  const reg = new RegExp(props.searchText, 'gi')
  return text.replace(reg, highlightStr)
}
</script>
<style  lang='scss' scoped>
</style>