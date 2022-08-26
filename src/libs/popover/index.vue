<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div>
      <!-- 具名插槽：触发弹层的视图 -->
      <slot name="reference"></slot>
    </div>
  </div>
  <div>
    <!-- 匿名插槽：弹出层视图中展示的内容 -->
    <transition>
      <slot></slot>
    </transition>
  </div>
</template>
<script lang='ts' setup>
const onMouseenter = () => {}

const onMouseleave = () => {}
</script>
<style  lang='scss' scoped>
</style>