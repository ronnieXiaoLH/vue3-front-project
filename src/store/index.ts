import { createStore } from 'vuex'
import VuexPersister from 'vuex-persister'
import category, { CategorysProps } from './modules/category'
import theme, { ThemeProps } from './modules/theme'
import app, { AppProps } from './modules/app'
import search, { SearchProps } from './modules/search'

export interface GlobalDataProps {
  category: CategorysProps
  theme: ThemeProps
  app: AppProps
  search: SearchProps
}

const vuexPersister = new VuexPersister<GlobalDataProps>({
  key: 'my-store',
  overwrite: true,
  storage: localStorage,
})

const store = createStore<GlobalDataProps>({
  modules: {
    category,
    theme,
    app,
    search,
  },
  // plugins: [vuexPersister.persist],
})

export default store
