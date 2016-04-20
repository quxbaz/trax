import omit from 'lodash.omit'
import actionTypes from './actionTypes'

export const initialState = Object.freeze({
  number: undefined,
  title: undefined,
  sample: undefined,
  beats: 16,
  mute: false,
  solo: false,
  archived: false,
  blips: []
})

const channel = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CHANNEL:
      return {...initialState, ...action.payload}
    default:
      return state
  }
}

const channels = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CHANNEL:
      return {
        ...state,
        [action.payload.id]: channel(undefined, action)
      }
    case actionTypes.REMOVE_CHANNEL:
      return omit(state, action.payload)
    default:
      return state
  }
}

export default channels
