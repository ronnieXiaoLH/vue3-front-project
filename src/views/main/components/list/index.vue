<template>
  <div>
    <m-waterfall
      :data="pexelsList"
      nodeKey="id"
      :column="5"
      :picturePreReading="true"
    >
      <template v-slot="{ item, width }">
        <item-vue :data="item"></item-vue>
      </template>
    </m-waterfall>
  </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue'
import { getPexlesList } from '../../../../api/pexels.js'
import { PexelsItem } from '../../../../helper'
import itemVue from './item.vue'

const query = {
  page: 1,
  size: 20,
}

const pexelsList = ref<PexelsItem[]>([])

const getPexlesData = async () => {
  const res = await getPexlesList(query)
  pexelsList.value = res.list
  console.log(res)
}

getPexlesData()
</script>
<style  lang='scss' scoped>
</style>