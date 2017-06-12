import * as types from './mutation-types'

export default {
  [types.SET_USER_INFORMATION] (state, update) {
    Object.keys(update).forEach((key, index) => {
      state.user[key] = update[key]
    })
  },

  [types.SET_USER_ID] (state, update) {
    state.user.id = update
  },

  [types.ADD_TROPHY] (state, update) {
    state.trophies.push(update)
  }
}
