<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{ height: containerHeight + 'px' }"
  >
    <!-- 数据渲染 -->
    <template v-if="columnWidth && data.length">
      <div
        class="m-waterfall-item absolute duration-300"
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px',
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
    <!-- 加载中 -->
    <div v-else>加载中...</div>
  </div>
</template>
<script lang='ts' setup>
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  watch,
} from 'vue'
import { PexelsItem } from '../../helper'
import {
  getAllImg,
  getImgElements,
  getMaxHeigt,
  getMinHeigt,
  getMinHeigtColumn,
  onCompleteImgs,
} from './utils'

const props = defineProps({
  // 数据源
  data: {
    type: Array as PropType<PexelsItem[]>,
    required: true,
  },
  // 唯一标识
  nodeKey: {
    type: String,
  },
  // 列数
  column: {
    type: Number,
    defalut: 2,
  },
  // 列间距
  columnSpacing: {
    type: Number,
    default: 20,
  },
  // 行间距
  rowSpacing: {
    type: Number,
    default: 20,
  },
  // 是否需要进行图片预读取
  picturePreReading: {
    type: Boolean,
    default: true,
  },
})

// 容器实例
const containerTarget = ref()
// 容器总高度 = 最高的一列的高度
const containerHeight = ref<number>(0)
// 记录每列高度的容器
const columnHeightObj = ref()

const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column!; i++) {
    columnHeightObj.value[i] = 0
  }
}

// 容器总高度（不包含 padding margin border）
const containerWidth = ref<number>(0)
// 容器的左边距
const containerLeft = ref<number>(0)

// 计算容器宽度
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )
  containerLeft.value = parseFloat(paddingLeft)
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}

// 列宽 = （容器的宽度 - 所有的列间距） / 列数
const columnWidth = ref(0)
// 列间距的合计
const columnSpacingTotal = computed(
  () => (props.column! - 1) * props.columnSpacing
)

// 计算每一列宽度
const useColumnWidth = () => {
  useContainerWidth()
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column!
}

onMounted(() => {
  useColumnWidth()
})

// 图片的高度集合
let itemheights: number[] = []

// 监听图片加载完成
const waitImgComplete = () => {
  itemheights = []
  const itemElements = Array.from(
    document.querySelectorAll('.m-waterfall-item')
  ) as HTMLElement[]
  // 获取元素的 img 标签
  const imgElements = getImgElements(itemElements)
  // 获取所有的 img 标签的图片
  const allImgs = getAllImg(imgElements)
  // 等待图片加载完成
  onCompleteImgs(allImgs).then(() => {
    // 图片加载完成
    itemElements.forEach((el) => {
      itemheights.push(el.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
  })
}

const useItemLocation = () => {
  props.data.forEach((item, index) => {
    // 避免重复计算
    if (item?._style) return
    // 当前 item 要放在高度最小的那一列中
    item._style = {}
    item._style.left = getItemLeft()
    item._style.top = getItemTop()
    // 指定的列高度自增
    increasingHeight(index)
  })
  // 指定容器的高度
  containerHeight.value = getMaxHeigt(columnHeightObj.value)
}

const getItemLeft = () => {
  // 拿到最小宽度的列
  const column: number = getMinHeigtColumn(columnHeightObj.value)
  return (
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  )
}

const getItemTop = () => getMinHeigt(columnHeightObj.value)

const increasingHeight = (index: number) => {
  // 最小高度所在的列
  const minHeightColumn = getMinHeigtColumn(columnHeightObj.value)
  // 使该列的高度自增
  columnHeightObj.value[minHeightColumn] +=
    itemheights[index] + props.rowSpacing
}

// 不需要图片预加载
const useItemHeight = () => {
  itemheights = []
  const itemElements = Array.from(
    document.querySelectorAll('.m-waterfall-item')
  ) as HTMLElement[]
  itemElements.forEach((el) => {
    itemheights.push(el.offsetHeight)
  })
  // 渲染位置
  useItemLocation()
}

// 触发计算
watch(
  () => props.data,
  (newVal) => {
    nextTick(() => {
      // 第一次获取数据时，构建高度记录容器
      const resetColumnHeigt = newVal.every((item) => !item._style)
      if (resetColumnHeigt) {
        useColumnHeightObj()
      }
      if (props.picturePreReading) {
        waitImgComplete()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true,
  }
)

onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})
</script>
<style  lang='scss' scoped>
</style>