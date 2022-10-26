import request from '@/utils/request'

export const loginUser = (data) => {
  return request({
    url: '/sys/login',
    method: 'post',
    data,
  })
}

export const getProfile = () => {
  return request({
    url: '/user/profile',
  })
}

export const registerUser = (data) => {
  return request({
    url: '/sys/register',
    method: 'post',
    data,
  })
}
