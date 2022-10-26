<template>
  <div
    class="
      fixed
      top-[20%]
      left-[50%]
      translate-x-[-50%]
      w-[340px]
      h-[270px]
      text-sm
      bg-white
      dark:bg-zinc-800
      rounded
      border border-zinc-200
      dark:border-zinc-900
      shadow-2xl
    "
  >
    <!-- 头部 -->
    <div class="flex items-center h-5 text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请完成安全认证</span>
      <m-svg-icon
        class="
          w-3
          h-3
          p-0.5
          rounded-sm
          duration-300
          cursor-pointer
          hover:bg-zinc-200
          dark:hover:bg-zinc-900
        "
        name="refresh"
        @click="onReset"
      ></m-svg-icon>
      <m-svg-icon
        class="
          ml-2
          w-3
          h-3
          p-0.5
          rounded-sm
          duration-300
          cursor-pointer
          hover:bg-zinc-200
          dark:hover:bg-zinc-900
        "
        name="close"
        @click="onClose"
      ></m-svg-icon>
    </div>

    <!-- captcha -->
    <div id="captcha"></div>
  </div>
</template>

<script lang="ts">
const EMITS_CLOSE = 'close'
const EMITS_SUCCESS = 'success'
</script>
<script lang='ts' setup>
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
import { onMounted } from '@vue/runtime-core'

let captcha: any = null

onMounted(() => {
  captcha = sliderCaptcha({
    // 渲染位置
    id: 'captcha',
    // 用户拼图成功之后的回调
    onSuccess(arr: number[]) {
      // 如果业务要求比较高，这里可以由后端对移动轨迹做判断
      // TODO：人类行为验证通过
      emits(EMITS_SUCCESS)
    },
    // 用户拼图失败之后的回调
    onFail() {
      console.log('fail')
    },
    // 默认的验证方法
    verify() {
      return true
    },
  })
})

const emits = defineEmits([EMITS_CLOSE, EMITS_SUCCESS])

const onReset = () => {
  captcha.reset()
}

const onClose = () => {
  emits(EMITS_CLOSE)
}
</script>
<style  lang='scss' scoped>
</style>