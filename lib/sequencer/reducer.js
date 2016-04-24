import actionTypes from './actionTypes'
import channels from '../channels'

export const initialState = Object.freeze({
  playing: false,
  beats: 16,
  beatDuration: 100,
  currentBeat: -1,
  channels: []
})

const sequencer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SEQUENCER:
      return {...state, ...action.payload}
    case actionTypes.PLAY:
      return {...state, playing: true}
    case actionTypes.PAUSE:
      return {...state, playing: false}
    case actionTypes.TOGGLE_PLAY:
      return {...state, playing: !state.playing}
    case actionTypes.TICK:
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
