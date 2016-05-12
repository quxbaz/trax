import actionTypes from './actionTypes'

export const initialState = Object.freeze({
  activeBlock: undefined,
})

const blockAdmin = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_BLOCK:
      return {
        activeBlock: action.payload,
      }
    default:
      return state
  }
}

export default blockAdmin
