<template>
  <div class="bg-white dark:bg-zinc-900 duration-500 sticky top-0 left-0 z-10">
    <ul
      class="
        relative
        flex
        overflow-x-auto
        p-1
        text-xs text-zinc-600
        overflow-hidden
      "
      ref="ulTarget"
    >
      <!-- 滑块 -->
      <li
        class="
          absolute
          h-[22px]
          bg-zinc-900
          dark:bg-zinc-800
          rounded-lg
          duration-200
        "
        ref="sliderTarget"
        :style="sliderStyle"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        class="
          fixed
          top-0
          right-[-1px]
          h-4
          px-1
          flex
          items-center
          bg-white
          z-20
          shadow-l-white
          dark:bg-zinc-900 dark:shadow-l-zinc
        "
        @click="showPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
      <li
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{ 'text-zinc-100': currentCategoryIndex === index }"
        :ref="setItemRef"
        v-for="(item, index) in data"
        :key="item.id"
        @click="clickItem(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
  <m-popup v-model="isVisible">
    <menu-vue
      :currentCategoryIndex="currentCategoryIndex"
      @onClickItem="changeCategory"
    ></menu-vue>
  </m-popup>
</template>
<script lang='ts' setup>
import { computed, onBeforeUpdate, PropType, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import { CategoryItem } from '../types'
import MenuVue from '../../menu/index.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

const store = useStore<GlobalDataProps>()

const data = computed<CategoryItem[]>(() => store.getters['category/categorys'])

const currentCategoryIndex = computed(
  () => store.getters['app/currentCategoryIndex']
)

const sliderTarget = ref()

let itemRefs: HTMLElement[] = []
const setItemRef = (el: HTMLElement) => {
  el && itemRefs.push(el)
}

onBeforeUpdate(() => {
  itemRefs = []
})

const ulTarget = ref()

const { x: ulScrollLeft } = useScroll(ulTarget)

const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px',
})

const clickItem = (category: CategoryItem) => {
  store.commit('app/changeCurrentCategory', category)
}

watch(
  () => currentCategoryIndex.value,
  (index) => {
    if (!itemRefs[index]) return
    const { left, width } = itemRefs[index].getBoundingClientRect()
    sliderStyle.value = {
      transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
      width: width + 'px',
    }
  }
)

const isVisible = ref<boolean>(false)

const showPopup = () => {
  isVisible.value = true
}

const changeCategory = (category: CategoryItem) => {
  store.commit('app/changeCurrentCategory', category)
  isVisible.value = false
}
</script>