import omit from 'qux/lib/omit'
import without from 'qux/lib/without'
import mapValues from 'qux/lib/mapValues'
import channels from '../channels'
import actionTypes from './actionTypes'

export const blockInitialState = Object.freeze({
  id: undefined,
  channels: [],
})

const block = (state, action) => {
  switch (action.type) {
    case actionTypes.CREATE_BLOCK:
      return {...blockInitialState, ...action.payload}
    case actionTypes.ADD_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, action.payload.channel],
      }
    case actionTypes.REMOVE_CHANNEL:
      return {
        ...state,
        channels: without(state.channels, action.payload.channel),
      }
    case channels.actionTypes.REMOVE_CHANNEL:
      return {
        ...state,
        channels: without(state.channels, action.payload),
      }
    default:
      return state
  }
}

const blocks = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_BLOCK:
    case actionTypes.ADD_CHANNEL:
    case actionTypes.REMOVE_CHANNEL:
      const {id} = action.payload
      return {
        ...state,
        [id]: block(state[id], action),
      }
    case actionTypes.REMOVE_BLOCK:
      return omit(state, action.payload)
    case channels.actionTypes.REMOVE_CHANNEL:
      return mapValues(state, (v) => block(v, action))
    default:
      return state
  }
}

export default blocks
