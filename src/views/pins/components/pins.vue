<template>
  <div
    class="
      fixed
      top-0
      left-0
      w-screen
      h-screen
      text-xl
      backdrop-blur-4xl
      bg-transparent
      pb-2
      overflow-y-auto
      xl:p-2
      z-20
    "
  >
    <!-- 移动端下 -->
    <m-navbar v-if="isMobileTermial"
      >{{ pexelsData.title }}

      <template #right>
        <m-svg-icon
          name="share"
          class="w-3 h-3"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </template>
    </m-navbar>

    <!-- PC端下 -->
    <m-svg-icon
      v-else
      name="close"
      class="
        w-3
        h-3
        ml-1
        p-0.5
        cursor-pointer
        duration-200
        rounded-sm
        hover:bg-zinc-100
        absolute
        right-2
        top-2
      "
      fillClass="fill-zinc-400"
      @click="onPop"
    ></m-svg-icon>

    <!-- 内容区 -->
    <div class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
      <img
        :src="pexelsData.photo"
        class="
          w-screen
          mb-2
          xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg
        "
      />
      <div
        class="
          xl:w-2/5
          xl:h-full
          xl:bg-white
          xl:dark:bg-zinc-900
          xl:rounded-tr-lg
          xl:rounded-br-lg
          xl:p-3
        "
      >
        <!-- PC端下：收藏、分享 -->
        <div v-if="!isMobileTermial" class="flex justify-between mb-2">
          <!-- 分享 -->
          <m-svg-icon
            name="share"
            class="
              w-4
              h-4
              p-1
              cursor-pointer
              hover:bg-zinc-200
              dark:hover:bg-zinc-800
              duration-300
              rounded
            "
          ></m-svg-icon>
          <!-- 收藏 -->
          <m-button
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          ></m-button>
        </div>
        <!-- 标题 -->
        <p
          class="
            text-base text-zinc-900
            dark:text-zinc-200
            ml-1
            font-bold
            xl:text-xl xl:mb-5
          "
        >
          {{ pexelsData.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center mt-1 px-1">
          <img
            v-lazy
            :src="pexelsData.avatar"
            class="w-3 h-3 rounded-full mr-1"
          />
          <span class="text-base text-zinc-900 dark:text-zinc-200">{{
            pexelsData.author
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isMobileTermial } from '../../../utils/flexible'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const router = useRouter()

const pexelsData = ref({
  tags: ['all', 'home', 'desire', 'pets'],
  _id: '62208123fb7e8b6da85b7dfe',
  photoLink: 'https://www.pexels.com/zh-cn/photo/8051987/',
  photo:
    'https://images.pexels.com/photos/8051987/pexels-photo-8051987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  authorLike: 'https://www.pexels.com/zh-cn/@ugurcan-ozmen-61083217',
  avatar:
    'https://images.pexels.com/users/avatars/61083217/ugurcan-ozmen-235.jpeg?auto=compress&fit=crop&h=60&w=60',
  author: 'Uğurcan Özmen',
  photoDownLink: 'https://www.pexels.com/photo/8051987/download/',
  id: '8051987',
  title: '图片数据来自 pexels ',
  photoWidth: 500,
  photoHeight: 625,
  photoType: 'jpg',
  __v: 0,
})

const onPop = () => {
  router.back()
}
</script>
<style  lang='scss' scoped>
</style>