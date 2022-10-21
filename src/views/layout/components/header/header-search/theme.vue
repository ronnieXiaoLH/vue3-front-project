<template>
  <div>
    <div class="text-xs mb-1 text-zinc-400">热门精选</div>
    <div class="flex h-[140px]" v-if="themeBig">
      <!-- 大图 -->
      <div
        class="relative rounded w-[260px] cursor-pointer"
        :style="{ backgroundColor: randomRGB }"
      >
        <img
          v-lazy
          class="h-full w-full object-cover rounded"
          :src="themeBig.photo"
        />
        <p
          class="
            absolute
            bottom-0
            left-0
            w-full
            h-[45%]
            flex
            items-center
            backdrop-blur
            rounded
            px-1
            text-white text-xs
            duration-300
            hover:backdrop-blur-none
          "
        >
          # {{ themeBig.title }}
        </p>
      </div>
      <!-- 小图 -->
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div
          class="
            h-[45%]
            w-[260px]
            text-white text-xs
            relative
            ml-1.5
            mb-1.5
            rounded
          "
          v-for="item in themeList"
          :key="item.id"
        >
          <img
            class="w-full h-full object-cover rounded"
            v-lazy
            :src="item.photo"
          />
          <p
            class="
              absolute
              top-0
              left-0
              w-full
              h-full
              flex
              items-center
              backdrop-blur
              rounded
              px-1
              duration-300
              hover:backdrop-blur-none
            "
          >
            # {{ themeBig.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { getPexelsThemes } from '@/api/pexels'
import { ref } from '@vue/reactivity'
import { randomRGB } from '@/utils/color'

interface ThemeItem {
  id: string
  photo: string
  title: string
}

const themeBig = ref<ThemeItem | null>(null)
const themeList = ref<ThemeItem[]>([])

const getThemeData = async () => {
  const { themes } = await getPexelsThemes()
  themeBig.value = themes[0]
  themeList.value = themes.slice(1)
  console.log('res...', themes)
}

getThemeData()
</script>
<style  lang='scss' scoped>
</style>