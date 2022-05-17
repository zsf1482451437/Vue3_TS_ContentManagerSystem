import { createStore } from 'vuex'
import { IRootState } from './type'
import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'zsf',
      age: 18
    }
  },
  modules: {
    login
  }
})
export function setupStore() {
  store.dispatch('login/loadlocalLogin')
}
export default store
