import { Module } from 'vuex'
import md5 from 'md5'
import { GlobalDataProps } from '..'
import { loginUser, getProfile, registerUser } from '../../api/sys.js'
import { message } from '../../libs'

export interface UserProps {
  token: string
  userInfo: any
}

const app: Module<UserProps, GlobalDataProps> = {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
    },
    setUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo
    },
  },
  actions: {
    async register(context, payload) {
      // 加密密码
      const { password } = payload
      const data = await registerUser({
        ...payload,
        password: password ? md5(password) : '',
      })
    },
    async login(context, payload) {
      // 加密密码
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : '',
      })
      context.commit('setToken', data.token)
      context.dispatch('profile')
    },
    async profile(context) {
      const data = await getProfile()
      const { vipLevel, nickname } = data
      context.commit('setUserInfo', data)
      message({
        type: 'success',
        message: `欢迎您 ${
          vipLevel ? '尊贵的 VIP' + vipLevel + '用户' + nickname : nickname
        }`,
        duration: 3000,
      })
    },
    logout(context) {
      // 清空 token
      context.commit('setToken', '')
      // 清空用户信息
      context.commit('setUserInfo', {})
      // 刷新页面
      location.reload()
    },
  },
}

export default app
