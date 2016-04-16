import actionTypes from './actionTypes'
import blip from '../blip'

export const initialState = {
  sample: '',
  beats: 16,
  mute: false,
  blips: []
}

const defaultBlips = (state) => {
  const blips = []
  for (let i=0; i < state.beats; i++) {
    blips.push(blip.reducer(undefined, {
      type: blip.actionTypes.CREATE_BLIP,
      payload: {
        sample: state.sample,
        beat: i
      }
    }))
  }
  return blips
}

const channel = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CHANNEL:
      const mergedState = {...state, ...action.payload}
      return {
        ...mergedState,
        blips: defaultBlips(mergedState)
      }
    default:
      return {...state, blips: defaultBlips(state)}
  }
}

export default channel
