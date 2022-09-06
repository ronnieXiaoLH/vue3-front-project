export const getImgElements = (elements: Element[]) => {
  const imgElements: HTMLImageElement[] = []
  elements.forEach((el) => {
    imgElements.push(...Array.from(el.getElementsByTagName('img')))
  })
  return imgElements
}

// 生成所有图片的链接数组
export const getAllImg = (imgElements: HTMLImageElement[]) =>
  imgElements.map((el) => el.src)

// 监听图片数组加载完成
export const onCompleteImgs = (imgs: string[]) => {
  const promises: Promise<{ img: string; index: number }>[] = []
  imgs.forEach((img, index) => {
    promises[index] = new Promise((resolve, reject) => {
      // 处理 img 的加载情况
      const imageObj = new Image()
      imageObj.src = img
      imageObj.onload = () => {
        resolve({
          img,
          index,
        })
      }
    })
  })
  return Promise.all(promises)
}

// 返回列高对象中最小的高度
export const getMinHeigt = (columnHeightObj: any) => {
  const columnHeightArr: number[] = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

// 返回列高对象中最大的高度
export const getMaxHeigt = (columnHeightObj: any) => {
  const columnHeightArr: number[] = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}

// 返回列高对象中最小高度所在的列
export const getMinHeigtColumn = (columnHeightObj: any) => {
  // 拿到最小的高度
  const minHeight = getMinHeigt(columnHeightObj)
  const r = Object.keys(columnHeightObj).find(
    (key) => columnHeightObj[key] === minHeight
  )
  return r ? +r : 0
}
