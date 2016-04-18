import actionTypes from './actionTypes'
import channel from '../channels'

export const initialState = Object.freeze({
  playing: false,
  beats: 16,
  beatDuration: 200,
  currentBeat: -1,
  channels: []
})

const sequencer = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE:
      return {...initialState, ...action.payload}
    case actionTypes.PLAY:
      return {...state, playing: true}
    case actionTypes.PAUSE:
      return {...state, playing: false}
    case actionTypes.STEP:
      return {
        ...state,
        currentBeat: (state.currentBeat + 1) % state.beats
      }
    case channel.actionTypes.CREATE:
      return {
        ...state,
        channels: [
          ...state.channels,
          action.payload.id
        ]
      }
    default:
      return state
  }
}

export default sequencer
