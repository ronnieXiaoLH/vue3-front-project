import request from '@/utils/request'

export const getPexlesList = (data) => {
  return request({
    url: '/pexels/list',
    params: data,
  })
}

export const getPexelsThemes = () => {
  return request({
    url: '/pexels/themes',
  })
}
