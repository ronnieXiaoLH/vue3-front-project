import { Module } from 'vuex'
import { GlobalDataProps } from '..'
import { ALL_CATEGORY_ITEM } from '../../constants'
import { CategoryItem } from './category'

export interface AppProps {
  currentCategory: CategoryItem
}

const app: Module<AppProps, GlobalDataProps> = {
  namespaced: true,
  state: {
    currentCategory: ALL_CATEGORY_ITEM,
  },
  mutations: {
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
  },
  getters: {
    currentCategoryIndex(state, getters, rootState) {
      return rootState.category.categorys.findIndex(
        (item) => item.id === state.currentCategory.id
      )
    },
  },
}

export default app
