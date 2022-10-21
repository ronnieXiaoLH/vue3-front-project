<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisible"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
        @click="close"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isVisible"
        class="
          w-[80%]
          fixed
          top-1/3
          left-[50%]
          translate-x-[-50%]
          z-50
          px-2
          py-1.5
          rounded-sm
          border
          dark:border-zinc-600
          cursor-pointer
          bg-white
          dark:bg-zinc-800
          xl:w-[35%]
        "
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 文本 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <m-button type="info" class="mr-2" @click="onCancelClick">
            {{ cancelBtnText }}
          </m-button>
          <m-button type="primary" @click="onConfirmClick">
            {{ confirmBtnText }}
          </m-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang='ts' setup>
import { ref } from '@vue/reactivity'
import { onMounted, onUnmounted } from '@vue/runtime-core'
import mButton from '../button/index.vue'
const props = defineProps({
  // 标题
  title: {
    type: String,
  },
  // 描述
  content: {
    type: String,
  },
  // 取消按钮
  cancelBtnText: {
    type: String,
    default: '取消',
  },
  // 确定按钮
  confirmBtnText: {
    type: String,
    default: '确定',
  },
  // 取消按钮事件
  cancalBtnHandler: {
    type: Function,
  },
  // 确定按钮事件
  confirmBtnHandler: {
    type: Function,
  },
  // 关闭的回调
  close: {
    type: Function,
  },
})

const isVisible = ref<boolean>(false)

const show = () => {
  isVisible.value = true
}

/**
 * 处理动画
 */
onMounted(() => {
  show()
})

// 取消按钮点击事件
const onCancelClick = () => {
  props.cancalBtnHandler?.()
  close()
}

// 确认按钮点击事件
const onConfirmClick = () => {
  props.confirmBtnHandler?.()
  close()
}

const duration: string = '0.5s'

// 关闭事件
let timer: any
const close = () => {
  isVisible.value = false
  // 等待动画完全结束之后，再去触发 close 事件
  timer = setTimeout(() => {
    props.close?.()
  }, 100 * parseFloat(duration.replace('s', '')))
}

onUnmounted(() => {
  timer && clearTimeout(timer)
})
</script>
<style  lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}
.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>