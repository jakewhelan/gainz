export const TOGGLE_TEST = '[app] TOGGLE_TEST';

export const actions = {
  toggleTest ({ commit, state }, { toggleState }) {
    commit(TOGGLE_TEST, toggleState)
  }
}