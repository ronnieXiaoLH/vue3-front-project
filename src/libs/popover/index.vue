<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽：触发弹层的视图 -->
      <slot name="reference"></slot>
    </div>
    <!-- 匿名插槽：弹出层视图中展示的内容 -->
    <transition name="slide">
      <div
        ref="contentTarget"
        v-show="isVisible"
        class="
          absolute
          p-1
          z-20
          bg-white
          dark:bg-zinc-900
          border
          dark:border-zinc-700
          rounded-md
        "
        :style="contentStyle"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
// 左上
const PROP_TOP_LEFT = 'top-left'
// 右上
const PROP_TOP_RIGHT = 'top-right'
// 左下
const PROP_BOTTOM_LEFT = 'bottom-left'
// 右下
const PROP_BOTTOM_RIGHT = 'bottom-right'

const PLACEMENT_ENUM = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT,
]

const DELAY_TIME = 100
</script>
<script lang='ts' setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val: string) {
      if (!PLACEMENT_ENUM.includes(val)) {
        throw new Error(
          `你的 placement 必须是 ${PLACEMENT_ENUM.join('、')} 中的一个`
        )
      }
      return true
    },
  },
})

const isVisible = ref<boolean>(false)

let timer: any

const onMouseenter = () => {
  timer && clearTimeout(timer)
  isVisible.value = true
}

const onMouseleave = () => {
  timer = setTimeout(() => {
    isVisible.value = false
    timer = null
  }, DELAY_TIME)
}

const referenceTarget = ref()
const contentTarget = ref()

const getElementSize = (target: HTMLElement | null) => {
  if (!target)
    return {
      width: 0,
      height: 0,
    }
  return {
    width: target.offsetWidth,
    height: target.offsetHeight,
  }
}

const contentStyle = ref({
  top: '0',
  left: '0',
})

watch(
  () => isVisible.value,
  (val) => {
    if (!val) return
    nextTick(() => {
      const { width: contentWidth, height: contentHeight } = getElementSize(
        contentTarget.value
      )
      const { width, height } = getElementSize(referenceTarget.value)
      switch (props.placement) {
        case PROP_TOP_LEFT:
          contentStyle.value.top = '0'
          contentStyle.value.left = -contentWidth + 'px'
          break
        case PROP_TOP_RIGHT:
          contentStyle.value.top = '0'
          contentStyle.value.left = width + 'px'
          break
        case PROP_BOTTOM_LEFT:
          contentStyle.value.top = height + 'px'
          contentStyle.value.left = -contentWidth + 'px'
          break
        case PROP_BOTTOM_RIGHT:
          contentStyle.value.top = height + 'px'
          contentStyle.value.left = width + 'px'
          break
        default:
          break
      }
    })
  }
)
</script>
<style  lang='scss' scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>