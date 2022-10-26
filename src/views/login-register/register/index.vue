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
      <vee-form @submit="regHandler">
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
          v-model="regForm.username"
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
          v-model="regForm.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        ></vee-error-message>
        <!-- 确认密码 -->
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
          name="confirmPassword"
          placeholder="密码"
          autocomplete="on"
          rules="validateConfirmPassword:@password"
          v-model="regForm.confirmPassword"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="confirmPassword"
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
            @click="goToLogin"
            >去登录</a
          >
        </div>

        <!-- 注册协议 -->
        <div class="text-center">
          <a
            class="
              text-zinc-400
              dark:text-zinc-600
              hover:text-zinc-600
              dark:hover:text-zinc-400
              text-sm
              duration-300
            "
            href="https://m.imooc.com/newfaq?id=89"
            target="__black"
            >注册即同意《慕课网注册协议》</a
          >
        </div>

        <!-- 注册按钮 -->
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :isActiveAnimation="false"
          :loading="loading"
          >立即注册</m-button
        >
      </vee-form>
    </div>
  </div>
</template>
<script lang='ts' setup>
import headerVue from '../components/header.vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
  defineRule,
} from 'vee-validate'
import {
  validateUsername,
  validatePassword,
  validateConfirmPassword,
} from '../validate'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../../../store'
import { useRouter } from 'vue-router'

const store = useStore<GlobalDataProps>()

const router = useRouter()

const regForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
})

defineRule('validateConfirmPassword', validateConfirmPassword)

const loading = ref<boolean>(false)

const regHandler = async () => {
  loading.value = true
  try {
    const payload = {
      username: regForm.value.username,
      password: regForm.value.password,
    }
    await store.dispatch('user/register', payload)
    await store.dispatch('user/login', payload)
    router.push('/')
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>
<style  lang='scss' scoped>
</style>