<template>
  <button
    class="
      text-sm text-center
      rounded
      flex
      justify-center
      items-center
      duration-150
    "
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isActiveAnimation },
    ]"
    @click="onClick"
  >
    <!-- loading -->
    <m-svg-icon
      class="w-2 h-2 animate-spin mr-1"
      v-if="loading"
      name="loading"
    ></m-svg-icon>
    <!-- icon 按钮 -->
    <m-svg-icon
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      v-if="icon"
      :name="icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></m-svg-icon>
    <slot v-else></slot>
  </button>
</template>
<script lang="ts">
import { computed } from '@vue/runtime-core'

// type: 表示按钮风格
const typeEnum = {
  primary:
    'text-white bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
  main: 'text-white bg-main dark:bg-zinc-900 hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700',
  info: 'text-zinc-800 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-700 active:bg-zinc-200 dark:active:bg-zinc-600',
}

// size: 表示按钮的大小。区分文字按钮和图标按钮
const sizeEnum = {
  // 文字按钮
  default: {
    button: 'w-8 h-4 text-base',
    icon: '',
  },
  // 图标按钮
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5',
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: '',
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5',
  },
}

const EMITS_CLICK = 'click'
</script>
<script lang='ts' setup>
const props = defineProps({
  // icon 的 name
  icon: String,
  // icon 的颜色
  iconColor: String,
  // icon 的 class
  iconClass: String,
  // 按钮的类型
  type: {
    type: String,
    default: 'main',
    validator(val: string) {
      const keys = Object.keys(typeEnum)
      const res = keys.includes(val)
      if (!res) {
        throw new Error(`你的 type 必须是 ${keys.join('、')} 中的一个`)
      }
      return res
    },
  },
  // 按钮的大小
  size: {
    type: String,
    default: 'default',
    validator(val: string) {
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'))
      const res = keys.includes(val)
      if (!res) {
        throw new Error(`你的 size 必须是 ${keys.join('、')} 中的一个`)
      }
      return res
    },
  },
  // 按钮点击时，是否需要动画
  isActiveAnimation: {
    type: Boolean,
    default: true,
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false,
  },
})

const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})

const emits = defineEmits([EMITS_CLICK])

const onClick = () => {
  if (props.loading) return
  emits(EMITS_CLICK)
}
</script>
<style  lang='scss' scoped>
</style>