<template>
  <div
    class="w-5 flex flex-col items-center justify-center mx-0.5"
    @click="onClickItem"
  >
    <m-svg-icon
      class="w-2 h-2"
      :name="icon"
      :fillClass="iconClass"
    ></m-svg-icon>
    <p class="text-sm mt-0.5" :class="textClass">
      <slot></slot>
    </p>
  </div>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  iconClass: {
    type: String,
  },
  textClass: {
    type: String,
    default: 'text-zinc-900 dark:text-zinc-200',
  },
  to: {
    type: String,
  },
})

const router = useRouter()

const onClickItem = () => {
  if (!props.to) return
  router.push(props.to)
}
</script>
<style  lang='scss' scoped>
</style>