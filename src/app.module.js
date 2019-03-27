import { TOGGLE_TEST, actions } from './app.actions'

export const state = {
  test: true
}

export const mutations = {
  [TOGGLE_TEST] (state, { toggleState }) {
    state.test = toggleState
  }
}

export const AppModule = [
  'app', 
  {
    namespaced: true,
    state,
    mutations,
    actions
  }
]