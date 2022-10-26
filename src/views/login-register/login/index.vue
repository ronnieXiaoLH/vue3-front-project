<template>
  <div
    class="
      relative
      h-screen
      bg-white
      dark:bg-zinc-800
      text-center
      xl:bg-zinc-200
    "
  >
    <!-- 头部图片 -->
    <header-vue></header-vue>

    <!-- 登录表单区 -->
    <div
      class="
        block
        px-3
        mt-4
        dark:bg-zinc-800
        xl:bg-white
        xl:w-[388px]
        xl:dark:bg-zinc-900
        xl:m-auto
        xl:mt-8
        xl:py-4
        xl:rounded-sm
        xl:shadow-lg
      "
    >
      <h3
        class="
          hidden
          mb-2
          font-semibold
          text-base text-main
          dark:text-zinc-300
          xl:block
        "
      >
        账号登录
      </h3>

      <!-- 表单 -->
      <vee-form @submit="loginHandler">
        <!-- 用户名 -->
        <vee-field
          class="
            dark:bg-zinc-800 dark:text-zinc-400
            border-b-zinc-400 border-b
            text-base
            w-full
            outline-0
            pb-1
            px-1
            focus:border-b-main
            dark:focus:border-b-zinc-200
            xl:default:bg-zinc-900
          "
          type="text"
          name="username"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
          v-model="loginForm.username"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        ></vee-error-message>
        <!-- 密码 -->
        <vee-field
          class="
            dark:bg-zinc-800 dark:text-zinc-400
            border-b-zinc-400 border-b
            text-base
            w-full
            outline-0
            pb-1
            px-1
            focus:border-b-main
            dark:focus:border-b-zinc-200
            xl:default:bg-zinc-900
          "
          type="password"
          name="password"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
          v-model="loginForm.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        ></vee-error-message>

        <!-- 跳转按钮 -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="
              inline-block
              p-1
              text-zinc-400
              dark:text-zinc-600
              hover:text-zinc-600
              dark:hover:text-zinc-400
              text-sm text-right
              duration-300
              cursor-pointer
            "
            @click="goToRegister"
            >去注册</a
          >
        </div>

        <!-- 登录按钮 -->
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :isActiveAnimation="false"
          :loading="loading"
          >登录</m-button
        >

        <!-- 第三方登录 -->
        <div class="flex justify-around mt-4">
          <!-- QQ -->
          <m-svg-icon class="w-4 cursor-pointer" name="qq"></m-svg-icon>
          <!-- 微信 -->
          <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
        </div>
      </vee-form>

      <!-- 人类行为验证 -->
      <slider-captcha-vue
        v-if="isVisible"
        @close="isVisible = false"
        @success="onCaptchaSuccess"
      ></slider-captcha-vue>
    </div>
  </div>
</template>
<script lang='ts' setup>
import headerVue from '../components/header.vue'
import sliderCaptchaVue from './slider-captcha.vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
} from 'vee-validate'
import { validateUsername, validatePassword } from '../validate'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../../../store'
import { LOGIN_TYPE_USERNAME } from '../../../constants'
import { useRouter } from 'vue-router'

const store = useStore<GlobalDataProps>()

const router = useRouter()

const isVisible = ref<boolean>(false)

const loginForm = ref({
  username: '',
  password: '',
})

const loginHandler = () => {
  isVisible.value = true
}

const onCaptchaSuccess = () => {
  isVisible.value = false
  // 登录操作
  console.log('登录操作')
  onLogin()
}

const loading = ref<boolean>(false)

const onLogin = () => {
  loading.value = true
  try {
    // 登录操作
    store.dispatch('user/login', {
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME,
    })
    router.push('/')
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>
<style  lang='scss' scoped>
</style>