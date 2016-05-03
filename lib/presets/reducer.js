import omit from 'qux/lib/omit'
import actionTypes from './actionTypes'

export const initialState = Object.freeze({
  id: undefined,
  title: undefined,
  sample: undefined,
  mixable: undefined,
})

const preset = (state, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PRESET:
      return {...initialState, ...action.payload}
    default:
      return state
  }
}

const presets = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PRESET:
      var {id} = action.payload
      return {
        ...state,
        [id]: preset(state[id], action)
      }
    case actionTypes.REMOVE_PRESET:
      return omit(state, action.payload)
    default:
      return state
  }
}

export default presets
