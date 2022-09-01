<template>
  <teleport to="body">
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
        v-if="isVisible"
        @click="isVisible = false"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="popup-dowm-up">
      <div
        class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0"
        v-if="isVisible"
        v-bind="$attrs"
      >
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>
<script lang='ts' setup>
import { watch } from 'vue'
import { useScrollLock, useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const isVisible = useVModel(props)

// 锁定滚动
const isLocked = useScrollLock(document.body)

watch(
  () => isVisible.value,
  (val: boolean) => {
    isLocked.value = val
  },
  { immediate: true }
)
</script>
<style  lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
// 准备进入，离开完成
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-dowm-up-enter-active,
.popup-dowm-up-leave-active {
  transition: all 0.3s;
}
// 准备进入，离开完成
.popup-dowm-up-enter-from,
.popup-dowm-up-leave-to {
  transform: translateY(100%);
}
</style>