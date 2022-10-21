<template>
  <transition name="down">
    <div
      v-show="isVisible"
      class="
        min-w-[420px]
        fixed
        top-[20px]
        left-[50%]
        translate-x-[-50%]
        z-50
        flex
        items-center
        px-3
        py-1.5
        rounded-sm
        border
        cursor-pointer
      "
      :class="styles[type].containerClass"
    >
      <m-svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="h-1.5 w-1.5 mr-1.5"
      ></m-svg-icon>
      <span class="text-sm" :class="styles[type].textClass">{{ message }}</span>
    </div>
  </transition>
</template>
<script lang="ts">
import { onMounted, onUnmounted, PropType, ref } from 'vue'
import MSvgIcon from '../svg-icon/index.vue'

const SUCCESS = 'success'
const WARN = 'warn'
const ERROR = 'error'

const typeEnum = [SUCCESS, WARN, ERROR]
</script>
<script lang='ts' setup>
const props = defineProps({
  // 消息类型
  type: {
    type: String,
    required: true,
    validator(val: string) {
      const res = typeEnum.includes(val)
      if (!res) {
        throw new Error(`type 必须是 ${typeEnum.join('、')} 中的一个`)
      }
      return res
    },
  },
  // 消息文本
  message: {
    type: String,
    required: true,
  },
  // 消息展示时长
  duration: {
    type: Number,
  },
  // 关闭时的回调
  destory: {
    type: Function,
    required: true,
  },
})

const styles = {
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100',
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100',
  },
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100',
  },
}

const isVisible = ref<boolean>(false)
const timer = ref()
const duration: string = '0.5s'

// 为了保证动画展示，不能直接展示
onMounted(() => {
  isVisible.value = true
  timer.value = setTimeout(() => {
    isVisible.value = false
    setTimeout(() => {
      props.destory()
    }, 200 * parseFloat(duration.replace('s', '')))
  }, props.duration)
})

onUnmounted(() => {
  timer.value && clearTimeout(timer.value as any)
})
</script>
<style  lang='scss' scoped>
.down-enter-active,
.down-leave-active {
  transition: all v-bind(duration);
}
.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>