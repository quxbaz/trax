import actionTypes from './actionTypes'

export const initialState = Object.freeze({
  sample: '',
  beat: undefined,
  mute: false,
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
    case actionTypes.CREATE:
      return {...initialState, ...action.payload}
    default:
      return state
  }
}

const blips = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {
        ...state,
        [action.payload.id]: blip(undefined, action)
      }
    default:
      return state
  }
}

export default blips
