import {times} from '../util'
import actionTypes from './actionTypes'
import blip from '../blips'

export const initialState = Object.freeze({
  sample: '',
  beats: 16,
  mute: false,
  blips: []
})

const channel = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {...initialState, ...action.payload}
    default:
      return state
  }
}

const channels = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {
        ...state,
        [action.payload.id]: channel(undefined, action)
      }
    default:
      return state
  }
}

export default channels
