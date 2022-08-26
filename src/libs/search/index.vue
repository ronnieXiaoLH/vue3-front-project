<template>
  <div
    ref="containerTarget"
    class="
      group
      relative
      p-0.5
      rounded-xl
      border-white
      duration-500
      hover:bg-red-100/40
    "
  >
    <div>
      <!-- 搜索图标 -->
      <m-svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        name="search"
        color="#707070"
      ></m-svg-icon>
      <!-- 输入框 -->
      <input
        class="
          block
          w-full
          h-[44px]
          pl-4
          outline-0
          bg-zinc-100
          caret-zinc-400
          rounded-xl
          text-zinc-900
          tracking-wide
          text-sm
          font-semibold
          border border-zinc-100
          focus:border-red-300
          group-hover:bg-white group-hover:border-zinc-200
          duration-500
        "
        type="text"
        placeholder="搜索"
        v-model="inputValue"
        @focus="handleFocus"
        @keyup.enter="handleSearch"
      />
      <!-- 删除按钮 -->
      <m-svg-icon
        class="
          h-1.5
          w-1.5
          absolute
          translate-y-[-50%]
          top-[50%]
          right-9
          duration-500
          cursor-pointer
        "
        v-show="inputValue"
        name="input-delete"
        @click="handleClear"
      ></m-svg-icon>
      <!-- 分割线 -->
      <div
        class="
          opacity-0
          h-1.5
          w-[1px]
          absolute
          translate-y-[-50%]
          top-[50%]
          right-[62px]
          duration-500
          bg-zinc-200
          group-hover:opacity-100
        "
      ></div>
      <!-- 搜索按钮 -->
      <m-button
        class="
          opacity-0
          absolute
          translate-y-[-50%]
          top-[50%]
          right-1
          rounded-full
          group-hover:opacity-100
          duration-500
        "
        icon="search"
        iconColor="#fff"
        @click="handleSearch"
      ></m-button>
    </div>
    <!-- 下拉区 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="
          max-h-[368px]
          w-full
          text-base
          overflow-auto
          bg-white
          dark:bg-zinc-800
          absolute
          z-20
          left-0
          top-[56px]
          p-2
          rounded
          border border-zinc-200
          dark:border-zinc-600
          duration-200
          hover:shadow-3xl
          scrollbar-thin scrollbar-thumb-zinc-200
          dark:scrollbar-thumb-zinc-900
          scrollbar-track-transparent
        "
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
const EMIT_SEARCH = 'search'
</script>
<script lang='ts' setup>
import { ref } from 'vue'
import { onClickOutside, useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const inputValue = useVModel(props)

const emits = defineEmits([EMIT_UPDATE_MODELVALUE, EMIT_SEARCH])

const handleClear = () => {
  inputValue.value = ''
}

const handleSearch = () => {
  emits(EMIT_SEARCH, inputValue.value)
}

// 输入框聚焦
const isFocus = ref<boolean>(false)
const handleFocus = () => {
  isFocus.value = true
}

// 点击区域外，隐藏 dropdown
const containerTarget = ref()
onClickOutside(containerTarget, () => {
  isFocus.value = false
})
</script>
<style  lang='scss' scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>