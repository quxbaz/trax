import actionTypes from './actionTypes'
import blocks from '../blocks'

export const initialState = Object.freeze({
  currentBlock: undefined,
})

const blockAdmin = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_BLOCK:
      return {
        ...state,
        currentBlock: action.payload,
      }
    case blocks.actionTypes.REMOVE_BLOCK:
      return {
        ...state,
        currentBlock: action.payload === state.currentBlock ? undefined : state.currentBlock,
      }
    default:
      return state
  }
}

export default blockAdmin
