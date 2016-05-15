import actionTypes from './actionTypes'

export const blipInitialState = Object.freeze({
  id: undefined,
  beat: undefined,
  color: undefined,
  mute: false,
  mixable: undefined,
})

const blip = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_BLIP:
      return {...blipInitialState, ...action.payload}
    case actionTypes.TOGGLE_MUTE_BLIP:
      return {...state, mute: !state.mute}
    default:
      return state
  }
}

const blips = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_BLIP:
      return {
        ...state,
        [action.payload.id]: blip(undefined, action)
      }
    case actionTypes.TOGGLE_MUTE_BLIP:
      return {
        ...state,
        [action.payload]: blip(state[action.payload], action)
      }
    default:
      return state
  }
}

export default blips
