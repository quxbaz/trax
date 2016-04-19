import actionTypes from './actionTypes'
import channels from '../channels'

export const initialState = Object.freeze({
  playing: false,
  beats: 16,
  beatDuration: 200,
  currentBeat: -1,
  channels: []
})

const sequencer = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SEQUENCER:
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
    case channels.actionTypes.CREATE_CHANNEL:
      return {
        ...state,
        channels: [
          ...state.channels,
          action.payload.id
        ]
      }
    case channels.actionTypes.REMOVE_CHANNEL:
      return {
        ...state,
        channels: state.channels.filter(id => id != action.payload)
      }
    default:
      return state
  }
}

export default sequencer