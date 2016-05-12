import without from 'qux/lib/without'
import actionTypes from './actionTypes'

export const blockInitialState = Object.freeze({
  id: undefined,
  order: undefined,
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
    default:
      return state
  }
}

export default blocks
