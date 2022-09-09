<template>
  <div>
    <!-- 内容 -->
    <slot></slot>
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
        class="w-4 h-4 mx-auto animate-spin"
        v-show="loading"
        name="infinite-load"
      ></m-svg-icon>
      <!-- 没有更多数据 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        已经没有更多数据了
      </p>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref } from '@vue/reactivity'
import { onUnmounted, watch } from '@vue/runtime-core'
import { useIntersectionObserver, useVModel } from '@vueuse/core'

const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true,
  },
  // 数据是否加载完成
  isFinished: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue', 'onload'])

// 处理 loading 状态
const loading = useVModel(props)

// 滚动的元素
const loadingTarget = ref()
const targetIsIntersecting = ref<boolean>(false)
useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
  targetIsIntersecting.value = isIntersecting
  emitLoad()
})

let timer: any
const emitLoad = () => {
  // 加载更多的视图可见、loading 为 false、isFinished 为 true，处理加载更多的逻辑
  setTimeout(() => {
    if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
      loading.value = true
      emits('onload')
    }
  }, 100)
}

// 监听 loading 状态的变化，解决首次数据加载完成后，首屏数据没有铺满全屏的问题
watch(() => loading.value, emitLoad)

onUnmounted(() => {
  timer && clearTimeout(timer)
})
</script>
<style  lang='scss' scoped>
</style>