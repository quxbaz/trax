import actionTypes from './actionTypes'
import blocks from '../blocks'

export const initialState = Object.freeze({
  activeBlock: undefined,
})

const blockAdmin = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_BLOCK:
      return {
        ...state,
        activeBlock: action.payload,
      }
    case blocks.actionTypes.CREATE_BLOCK:
      return {
        ...state,
        activeBlock: action.meta.nBlocks === 0 ? action.payload.id : state.activeBlock,
      }
    default:
      return state
  }
}

export default blockAdmin
