<template>
  <div>
    <div class="flex items-center text-xs text-zinc-400 mb-1">
      <span>最近搜索</span>
      <m-svg-icon
        name="delete"
        class="
          w-2.5
          h-2.5
          ml-1
          p-0.5
          cursor-pointer
          duration-300
          rounded-sm
          hover:bg-zinc-100
        "
        fillClass="fill-zinc-400"
        @click="handleDeleteAll"
      ></m-svg-icon>
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="(item, index) in historys"
        :key="item"
        class="
          mr-2
          mb-1.5
          flex
          items-center
          cursor-pointer
          bg-zinc-100
          px-1.5
          py-0.5
          text-zinc-900 text-sm
          font-bold
          rounded-sm
          duration-300
          hover:bg-zinc-200
        "
        @click="clickItem(item)"
      >
        <span>{{ item }}</span>
        <m-svg-icon
          name="input-delete"
          class="
            w-2.5
            h-2.5
            p-0.5
            ml-1
            duration-300
            rounded-sm
            hover:bg-zinc-100
          "
          @click.stop="handleDelete(index)"
        ></m-svg-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
const EMITS_CLICK_ITEM = 'clickItem'
</script>
<script lang='ts' setup>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../../../../../store'
import { confirm } from '@/libs'

const store = useStore<GlobalDataProps>()

const historys = computed(() => store.getters['search/historys'])

const handleDeleteAll = () => {
  confirm('你要删除所有的内容吗？')
    .then(() => {
      store.commit('search/deleteAllHistory')
      console.log('确定删除')
    })
    .catch(() => {
      console.log('取消删除')
    })
}

const handleDelete = (index: number) => {
  store.commit('search/deleteHistory', index)
}

const emits = defineEmits([EMITS_CLICK_ITEM])

const clickItem = (val: string) => {
  emits(EMITS_CLICK_ITEM, val)
}
</script>
<style  lang='scss' scoped>
</style>