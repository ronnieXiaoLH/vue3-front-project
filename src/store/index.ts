import { createStore } from 'vuex'
import VuexPersister from 'vuex-persister'
import category, { CategorysProps } from './modules/category'

export interface GlobalDataProps {
  category: CategorysProps
}

const vuexPersister = new VuexPersister<GlobalDataProps>({
  key: 'my-store',
  overwrite: true,
  storage: localStorage,
})

const store = createStore<GlobalDataProps>({
  modules: {
    category,
  },
  plugins: [vuexPersister.persist],
})

export default store
