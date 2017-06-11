import * as types from './mutation-types'

export default {
  [types.USER_INFORMATION] (state, update) {
    state.user = update
  },

  [types.SET_USER_ID] (state, update) {
    state.user.id = update
  }
}
