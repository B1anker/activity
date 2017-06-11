import * as types from './mutation-types'

export const userInfomation = ({ commit }, update) => {
  commit(types.USER_INFORMATION, update)
}

export const setUserId = ({ commit }, update) => {
  commit(types.SET_USER_ID, update)
}
