<template>
  <div class="relative leading-[0px]">
    <!-- 单行 -->
    <input
      v-if="type === TYPE_TEXT"
      class="
        border-gray-200
        dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400
        border
        outline-0
        py-0.5
        px-1
        text-sm
        rounded-sm
        focus:border-blue-400
        w-full
        duration-300
      "
      type="text"
      v-model="text"
      :maxlength="max"
    />
    <!-- 多行 -->
    <textarea
      v-if="type === TYPE_TEXTAREA"
      class="
        border-gray-200
        dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400
        border
        outline-0
        py-0.5
        px-1
        text-sm
        rounded-sm
        focus:border-blue-400
        w-full
        duration-300
      "
      rows="5"
      v-model="text"
      :maxlength="max"
    ></textarea>
    <!-- 最大长度 -->
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ 'text-red-700': currentNumber === parseInt(max) }"
    >
      {{ currentNumber || 0 }} / {{ max }}
    </span>
  </div>
</template>
<script lang='ts'>
import { computed, Ref } from 'vue'
import { useVModel } from '@vueuse/core'

const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
</script>

<script lang='ts' setup>
const props = defineProps({
  // v-model
  modelValue: {
    type: String,
    required: true,
  },
  // 输入框类型，单行或多行文本
  type: {
    type: String,
    default: TYPE_TEXT,
    validator(value: string) {
      const arr = [TYPE_TEXT, TYPE_TEXTAREA]
      const res = arr.includes(value)
      if (!res)
        throw new Error(`type 的值必须在可选范围内 【${arr.join('、')}】`)
      return res
    },
  },
  // 最大输入长度
  max: {
    type: [String, Number],
  },
})

const emits = defineEmits(['update:modelValue'])

const text = useVModel(props) as Ref<string>

// 输入的字符数
const currentNumber = computed(() => text.value?.length)
</script>
<style  lang='scss' scoped>
</style>