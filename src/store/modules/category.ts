import { Module } from 'vuex'
import { GlobalDataProps } from '..'
import { ALL_CATEGORY_ITEM } from '@/constants'
import { getCategory } from '@/api/category'

interface CategoryItem {
  id: string
  col: number
  name: string
  usrname: string
}

export interface CategorysProps {
  categorys: CategoryItem[]
}

const category: Module<CategorysProps, GlobalDataProps> = {
  namespaced: true,
  state: {
    categorys: [],
  },
  mutations: {
    setCategorys(state, newCategorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
    },
  },
  actions: {
    async useCategoryData({ commit }) {
      const { categorys } = await getCategory()
      commit('setCategorys', categorys)
    },
  },
  getters: {
    categorys(state) {
      return state.categorys
    },
  },
}

export default category
