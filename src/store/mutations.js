import * as types from './mutation-types'

export default {
  [types.USER_INFORMATION] (state, update) {
    state.user = update
  }
}
