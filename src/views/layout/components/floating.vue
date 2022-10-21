<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导页 -->
    <div
      class="
        guide-start
        w-4
        h-4
        mb-1
        bg-white
        dark:bg-zinc-900
        border
        dark:border-0
        border-zinc-200
        rounded-full
        flex
        justify-center
        items-center
        cursor-pointer
        duration-200
        hover:shadow-lg
        group
      "
      @click="onGuideClick"
    >
      <m-svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
      ></m-svg-icon>
    </div>
    <!-- 反馈 -->
    <m-popover class="guide-feedback flex items-center" placement="top-left">
      <template #reference>
        <div
          class="
            w-4
            h-4
            mb-1
            bg-white
            dark:bg-zinc-900
            border
            dark:border-0
            border-zinc-200
            rounded-full
            flex
            justify-center
            items-center
            cursor-pointer
            duration-200
            hover:shadow-lg
            group
          "
        >
          <m-svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
          ></m-svg-icon>
        </div>
      </template>
      <div
        class="
          flex
          items-center
          p-1
          cursor-pointer
          rounded
          hover:bg-zinc-100/60
          dark:hover:bg-zinc-800
        "
      >
        <m-svg-icon
          name="feedback"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
      </div>
    </m-popover>
  </div>
</template>
<script lang='ts' setup>
import { onMounted } from 'vue'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

let driver: any

onMounted(() => {
  driver = new Driver({
    allowClose: false,
    closeBtnText: '关闭',
    prevBtnText: '上一步',
    nextBtnText: '下一步',
    doneBtnText: '完成',
  })
})

const steps = [
  {
    element: '.guide-home',
    popover: {
      title: 'logo',
      description: '点击可以返回首页',
    },
  },
  {
    element: '.guide-search',
    popover: {
      title: '搜索',
      description: '搜索您期望的图片',
    },
  },
  {
    element: '.guide-theme',
    popover: {
      title: '风格',
      description: '选择一个您喜欢的风格',
      position: 'left',
    },
  },
  {
    element: '.guide-my',
    popover: {
      title: '账户',
      description: '这里标记了您的账户信息',
      position: 'left',
    },
  },
  {
    element: '.guide-start',
    popover: {
      title: '引导',
      description: '这里可以再次查看引导信息',
      position: 'left',
    },
  },
  {
    element: '.guide-feedback',
    popover: {
      title: '反馈',
      description: '您的任何不满都可以在这里告诉我们',
      position: 'left',
    },
  },
]

// 开始引导
const onGuideClick = () => {
  driver.defineSteps(steps)
  driver.start()
}
</script>
<style  lang='scss' scoped>
.driver-fix-stacking {
  position: fixed;
  z-index: 100004 !important;
}
</style>