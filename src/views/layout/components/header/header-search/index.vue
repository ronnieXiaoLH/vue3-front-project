<template>
  <m-search class="flex-1" v-model="inputValue">
    <template #dropdown>
      <div>dropdown</div>
    </template>
  </m-search>
</template>
<script lang='ts' setup>
import { ref } from 'vue'

const inputValue = ref<string>('')
</script>
<style  lang='scss' scoped>
</style>