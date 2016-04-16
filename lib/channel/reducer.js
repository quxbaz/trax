import actionTypes from './actionTypes'
import blip from '../blip'

export const initialState = {
  sample: '',
  beats: 16,
  mute: false,
  blips: []
}

const defaultBlips = () => {
  const blips = []
  for (let i=0; i < initialState.beats; i++) {
    blips.push(blip.reducer(undefined, {
      type: blip.actionTypes.CREATE_BLIP,
      payload: {beat: i}
    }))
  }
  return blips
}

const channel = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CHANNEL:
      return {
        ...state,
        blips: defaultBlips(),
        ...action.payload
      }
    default:
      return {...state, blips: defaultBlips()}
  }
}

export default channel
