import { createStore } from 'vuex'
import VuexPersister from 'vuex-persister'
import category, { CategorysProps } from './modules/category'
import theme, { ThemeProps } from './modules/theme'

export interface GlobalDataProps {
  category: CategorysProps
  theme: ThemeProps
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
  },
  plugins: [vuexPersister.persist],
})

export default store
