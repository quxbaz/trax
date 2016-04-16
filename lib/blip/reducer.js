import actionTypes from './actionTypes'

export const initialState = {
  beat: undefined,
  sample: '',
  mute: false,
  duration: 0,
  offset: 0,
  minOffset: 0,
  maxOffset: 3600,  // 60 seconds
  gain: 1,
  minGain: 0,
  maxGain: 10,
  rate: 1,
  minRate: 0,
  maxRate: 4
}

const blip = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_BLIP:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default blip
