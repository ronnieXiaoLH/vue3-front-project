<template>
  <m-search
    class="guide-search flex-1"
    v-model="inputValue"
    @search="searchHandler"
  >
    <template #dropdown>
      <div>
        <hint-vue
          v-show="inputValue"
          :searchText="inputValue"
          @clickItem="searchHandler"
        ></hint-vue>
        <history-vue
          v-show="!inputValue"
          @clickItem="searchHandler"
        ></history-vue>
        <theme-vue v-show="!inputValue"></theme-vue>
      </div>
    </template>
  </m-search>
</template>
<script lang='ts' setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../../../../../store'
import hintVue from './hint.vue'
import historyVue from './historys.vue'
import themeVue from './theme.vue'

const store = useStore<GlobalDataProps>()

const inputValue = ref<string>('')

// 搜索回调
const searchHandler = (val: string) => {
  if (val) {
    store.commit('search/addHistory', val)
    store.commit('app/changeSearchText', val)
  }
}
</script>
<style  lang='scss' scoped>
</style>