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
          <item-vue :data="item" :width="width"></item-vue>
        </template>
      </m-waterfall>
    </m-infinite>
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
</script>
<style  lang='scss' scoped>
</style>