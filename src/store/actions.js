import * as types from './mutation-types'

export const setUserInformation = ({ commit }, update) => {
  commit(types.SET_USER_INFORMATION, update)
}

export const setUserId = ({ commit }, update) => {
  commit(types.SET_USER_ID, update)
}

export const addTrophy = ({ commit }, update) => {
  commit(types.CLEAR_TROPHY, [])
  Object.prototype.toString.call(update).slice(8, -1) === 'Array' && update.forEach((item, index) => {
    commit(types.ADD_TROPHY, item)
  })
}
