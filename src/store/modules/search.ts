import { Module } from 'vuex'
import { GlobalDataProps } from '..'

export interface SearchProps {
  historys: string[]
}

const search: Module<SearchProps, GlobalDataProps> = {
  namespaced: true,
  state: {
    historys: [],
  },
  mutations: {
    /**
     * 新增：
     * 1. 新增的历史记录位于头部
     * 2. 不可出现重复的历史记录
     */
    addHistory(state, newHistory: string) {
      const index = state.historys.findIndex((item) => item === newHistory)
      if (index !== -1) {
        state.historys.splice(index, 1)
      }
      state.historys.unshift(newHistory)
    },
    deleteHistory(state, index: number) {
      state.historys.splice(index, 1)
    },
    deleteAllHistory(state) {
      state.historys = []
    },
  },
  getters: {
    historys(state) {
      return state.historys
    },
  },
}

export default search
