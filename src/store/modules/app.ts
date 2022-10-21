import { Module } from 'vuex'
import { GlobalDataProps } from '..'
import { ALL_CATEGORY_ITEM } from '../../constants'
import { CategoryItem } from './category'

export interface AppProps {
  currentCategory: CategoryItem
  searchText: string
}

const app: Module<AppProps, GlobalDataProps> = {
  namespaced: true,
  state: {
    currentCategory: ALL_CATEGORY_ITEM,
    searchText: '',
  },
  mutations: {
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText
    },
  },
  getters: {
    currentCategoryIndex(state, getters, rootState) {
      return rootState.category.categorys.findIndex(
        (item) => item.id === state.currentCategory.id
      )
    },
    searchText(state) {
      return state.searchText
    },
  },
}

export default app
