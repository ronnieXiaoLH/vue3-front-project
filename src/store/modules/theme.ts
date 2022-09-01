import { Module } from 'vuex'
import { GlobalDataProps } from '..'

export interface ThemeProps {
  themeType: 'light' | 'dark' | 'system'
}

const theme: Module<ThemeProps, GlobalDataProps> = {
  namespaced: true,
  state: {
    themeType: 'light',
  },
  mutations: {
    changeThemeType(state, newTheme) {
      state.themeType = newTheme
    },
  },
  getters: {
    themeType(state) {
      return state.themeType
    },
  },
}

export default theme
