import actionTypes from './actionTypes'

export const initialState = Object.freeze({
  sample: undefined,
  beat: undefined,
  color: undefined,
  mute: true,
  offset: 0,
  minOffset: 0,
  maxOffset: 3600,  // 60 seconds
  gain: 1,
  minGain: 0,
  maxGain: 10,
  rate: 1,
  minRate: 0,
  maxRate: 4
})

const blip = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_BLIP:
      return {...initialState, ...action.payload}
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
    case actionTypes.CREATE_MANY_BLIPS:
      const newState = {...state}
      action.payload.forEach((blipState) => {
        newState[blipState.id] = {...initialState, ...blipState}
      })
      return newState
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
