import actionTypes from './actionTypes'
import channel from '../channel'

export const initialState = {
  playing: false,
  beats: 16,
  beatDuration: 200,
  currentBeat: -1,
  channels: []
}

const sequencer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAY:
      return {...state, playing: true}
    case actionTypes.PAUSE:
      return {...state, playing: false}
    case actionTypes.STEP:
      return {
        ...state,
        currentBeat: (state.currentBeat + 1) % state.beats
      }
    case channel.actionTypes.CREATE_CHANNEL:
      return {
        ...state,
        channels: [
          ...state.channels,
          channel.reducer(undefined, action)
        ]
      }
    default:
      return state
  }
}

export default sequencer
