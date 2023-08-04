<template>
  <div
    class="
      h-full
      bg-zinc-200
      dark:bg-zinc-800
      duration-300
      overflow-auto
      xl:pt-1
    "
  >
    <div
      class="
        relative
        max-w-screen-lg
        mx-auto
        bg-white
        dark:bg-zinc-900
        duration-300
        xl:rounded-sm
        xl:border-zinc-200
        xl:dark:border-zinc-600
        xl:border
        xl:px-4
        xl:py-2
      "
    >
      <!-- 移动端 navbar -->
      <m-navbar v-if="isMobileTermial" sticky :clickLeft="onClickLeft"
        >个人资料</m-navbar
      >
      <!-- PC端标题 -->
      <div v-else class="text-lg text-center font-bold mb-4 dark:text-zinc-300">
        个人资料
      </div>

      <div
        class="
          h-full
          w-full
          px-1
          pb-4
          text-sm
          mt-2
          xl:w-2/3 xl:w-2/3 xl:w-2/3 xl:w-2/3 xl:w-2/3 xl:text-center
        "
      >
        <!-- 头像部分 -->
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
          <span
            class="
              w-8
              inline-block
              mb-2
              font-black
              text-sm
              dark:text-zinc-300
              xl:block xl:mx-auto
            "
            >我的头像</span
          >
          <div
            class="
              relative
              w-[80px]
              h-[80px]
              group
              xl:cursor-pointer xl:left-1/2 xl:translate-x-[-50%]
            "
          >
            <!-- 头像 -->
            <img
              class="rounded-full w-full h-full xl:inline-block"
              :src="userInfo.avatar"
            />
            <!-- PC端鼠标移入 -->
            <div
              class="
                absolute
                top-0
                rounded-full
                w-full
                h-full
                duration-300
                bg-black/40
                hidden
                xl:group-hover:block
              "
              @click="selectImg"
            >
              <m-svg-icon
                class="w-2 h-2 m-auto mt-2"
                name="change-header-image"
              ></m-svg-icon>
              <div
                class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5"
              >
                点击更换头像
              </div>
            </div>
            <!-- 隐藏域，用来上传图片 -->
            <input
              v-show="false"
              ref="inputFileTarget"
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              @change="selectImgHandler"
            />
          </div>
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
            支持 jpg、png、ipeg、git 格式大小 1M 以内的图片
          </p>
        </div>

        <!-- 用户名 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">
            用户名
          </span>
          <m-input
            class="w-full"
            max="20"
            v-model="userInfo.nickname"
          ></m-input>
        </div>
        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">
            职位
          </span>
          <m-input class="w-full" v-model="userInfo.title"></m-input>
        </div>
        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">
            公司
          </span>
          <m-input class="w-full" v-model="userInfo.company"></m-input>
        </div>
        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">
            个人主页
          </span>
          <m-input class="w-full" v-model="userInfo.homePage"></m-input>
        </div>
        <!-- 个人介绍 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">
            个人介绍
          </span>
          <m-input
            class="w-full"
            type="textarea"
            max="50"
            v-model="userInfo.introduction"
          ></m-input>
        </div>
        <!-- 保存修改 -->
        <m-button
          class="
            w-full
            mt-2
            mb-4
            dark:text-zinc-300 dark:bg-zinc-800
            xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]
          "
          >保存修改</m-button
        >
        <!-- 移动端：退出登录 -->
        <m-button
          v-if="isMobileTermial"
          class="
            w-full
            dark:text-zinc-300 dark:bg-zinc-800
            xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]
          "
          @click="onLogout"
          >退出登录</m-button
        >
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { confirm } from '../../libs'
import { GlobalDataProps } from '../../store'
import { isMobileTermial } from '../../utils/flexible'

const store = useStore<GlobalDataProps>()

const userInfo = computed(() => store.state.user.userInfo)

const router = useRouter()

const inputFileTarget = ref()

const selectImgHandler = (e: Event) => {
  console.log(e)
}

const selectImg = () => {
  inputFileTarget.value.click()
}

const onClickLeft = () => {
  router.back()
}

const onLogout = () => {
  confirm('退出登录', '确定要退出登录吗？').then(() => {
    store.dispatch('user/logout')
    router.push('/')
  })
}
</script>
<style  lang='scss' scoped>
</style>