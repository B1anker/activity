import * as types from './mutation-types'

export const setUserInformation = ({ commit }, update) => {
  commit(types.SET_USER_INFORMATION, update)
}

export const setFromUserInformation = ({ commit }, update) => {
  commit(types.SET_FROM_USER_INFORMATION, update)
}

export const setActivityState = ({ commit }, update) => {
  commit(types.SET_ACTIVITY_STATE, update)
}

export const setAuth = ({ commit }, update) => {
  commit(types.SET_AUTH, update)
}

export const addTrophy = ({ commit }, update) => {
  commit(types.CLEAR_TROPHY, [])
  Object.prototype.toString.call(update).slice(8, -1) === 'Array' && update.forEach((item, index) => {
    commit(types.ADD_TROPHY, item)
  })
}

export const setButtonVisible = ({ commit }, update) => {
  commit(types.SET_BUTTON_VISIBLE, update)
}
