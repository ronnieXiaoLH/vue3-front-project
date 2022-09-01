<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        class="
          relative
          flex
          items-center
          p-0.5
          rounded-sm
          cursor-pointer
          duration-200
          outline-none
          hover:bg-zinc-100
          dark:hover:bg-zinc-900
        "
      >
        <img
          class="w-3 h-3 rounded-sm"
          src="https://img0.baidu.com/it/u=4223017733,3769112367&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=450"
        />
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <m-svg-icon
          class="h-1.5 w-1.5 absolute bottom-0 right-[16px]"
          name="vip"
        ></m-svg-icon>
      </div>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        class="
          flex
          items-center
          p-1
          cursor-pointer
          rounded
          hover:bg-zinc-200
          dark:hover:bg-zinc-800
        "
        v-for="item in menuList"
        :key="item.id"
      >
        <m-svg-icon
          class="w-1.5 h-1.5 mr-1"
          :name="item.icon"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 dark:text-zinc-300 text-sm">{{
          item.title
        }}</span>
      </div>
    </div>
  </m-popover>
</template>
<script lang='ts' setup>
interface MenuItem {
  id: number
  title: string
  icon: string
  path: string
}

const menuList: MenuItem[] = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile',
  },
  {
    id: 1,
    title: '升级VIP',
    icon: 'vip-profile',
    path: '/memeber',
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: '',
  },
]
</script>
<style  lang='scss' scoped>
</style>