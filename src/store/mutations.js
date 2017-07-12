import * as types from './mutation-types'
import { setProperties } from '@/utils/tool'

export default {
  [types.SET_USER_INFORMATION] (state, update) {
    setProperties(state.user, update)
  },

  [types.SET_FROM_USER_INFORMATION] (state, update) {
    setProperties(state.fromUser, update)
  },

  [types.SET_ACTIVITY_STATE] (state, update) {
    setProperties(state.activityState, update)
  },

  [types.SET_AUTH] (state, update) {
    setProperties(state.auth, update)
  },

  [types.CLEAR_TROPHY] (state, update) {
    state.trophies = update
  },

  [types.ADD_TROPHY] (state, update) {
    state.trophies.push(update)
  },

  [types.SET_BUTTON_VISIBLE] (state, update) {
    setProperties(state.buttonVisible, update)
  },

  [types.UPDATE_PAGE_DIRECTION] (state, update) {
    state.direction = update
  }
}
