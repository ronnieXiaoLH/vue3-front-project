<template>
  <div>
    <m-infinite
      v-model="loading"
      :isFinished="isFinished"
      @onload="getPexlesData"
    >
      <m-waterfall
        class="px-1 w-full"
        :data="pexelsList"
        nodeKey="id"
        :column="isMobileTermial ? 2 : 5"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <item-vue
            :data="item"
            :width="width"
            @itemClick="showDetail"
          ></item-vue>
        </template>
      </m-waterfall>
    </m-infinite>

    <!-- 详情内容展示 -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins-vue v-if="isShowDetail" :id="currentItem.id"></pins-vue>
    </transition>
  </div>
</template>
<script lang='ts' setup>
import { ref, watch } from 'vue'
import { getPexlesList } from '../../../../api/pexels.js'
import { PexelsItem } from '../../../../helper'
import itemVue from './item.vue'
import { isMobileTermial } from '../../../../utils/flexible'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../../../../store/index.js'
import { CategoryItem } from '../../../../store/modules/category.js'
import pinsVue from '../../../pins/components/pins.vue'
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core'

const store = useStore<GlobalDataProps>()

const loading = ref<boolean>(false)
const isFinished = ref<boolean>(false)

let query = {
  page: 1,
  size: 20,
}

const pexelsList = ref<PexelsItem[]>([])

const getPexlesData = async () => {
  // 数据全部加载完成 return
  if (isFinished.value) return
  if (pexelsList.value.length) {
    query.page++
  }
  const res = await getPexlesList(query)
  if (query.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value = pexelsList.value.concat(res.list)
  }
  // 判断数据是否全部加载完成
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  // 修改 loading 状态
  loading.value = false
}

const resetQuery = (newQuery: any) => {
  query = {
    ...query,
    ...newQuery,
  }
  isFinished.value = false
  pexelsList.value = []
}

watch(
  () => store.state.app.currentCategory,
  (newCategory: CategoryItem) => {
    resetQuery({
      page: 1,
      categoryId: newCategory.id,
    })
  }
)

watch(
  () => store.state.app.searchText,
  (val) => {
    resetQuery({
      page: 1,
      searchText: val,
    })
  }
)

// 控制详情内容的展示
const isShowDetail = ref<boolean>(false)

const currentItem = ref({
  id: '',
  position: {
    translateX: 0,
    translateY: 0,
  },
})

const showDetail = (item: any) => {
  console.log('item...', item)
  history.pushState(null, '', `/pins/${item.id}`)
  currentItem.value = item
  isShowDetail.value = true
}

const beforeEnter = (el: HTMLElement) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    opacity: 0,
    transformOrigin: '0 0',
    translateX: currentItem.value.position?.translateX,
    translateY: currentItem.value.position?.translateY,
  })
}
const enter = (el: HTMLElement, done: any) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    transformOrigin: '0 0',
    translateX: 0,
    translateY: 0,
    onComplete: done,
  })
}
const leave = (el: HTMLElement, done: any) => {
  gsap.to(el, {
    scaleX: 0,
    scaleY: 0,
    opacity: 0,
    transformOrigin: '0 0',
    translateX: currentItem.value.position?.translateX,
    translateY: currentItem.value.position?.translateY,
    onComplete: done,
  })
}

// 监听浏览器的后退按钮事件
useEventListener('popstate', () => {
  isShowDetail.value = false
})
</script>
<style  lang='scss' scoped>
</style>