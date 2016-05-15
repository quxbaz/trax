import actionTypes from './actionTypes'

export const initialState = Object.freeze({
  playing: false,
  beats: 16,
  beatDuration: 100,
  currentBeat: -1,
  currentBlock: undefined,
})

const player = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PLAYER:
      return {...state, ...action.payload}
    case actionTypes.PLAY:
      return {...state, playing: true}
    case actionTypes.PAUSE:
      return {...state, playing: false}
    case actionTypes.TOGGLE_PLAY:
      return {...state, playing: !state.playing}
    case actionTypes.SET_CURRENT_BEAT:
      return {...state, currentBeat: action.payload}
    case actionTypes.RESTART:
      return {...state, playing: true, currentBeat: -1}
    case actionTypes.TICK:
      return {
        ...state,
        currentBeat: (state.currentBeat + 1) % state.beats
      }
    case actionTypes.SET_CURRENT_BLOCK:
    case actionTypes.CLEAR_CURRENT_BLOCK:
      return {...state, currentBlock: action.payload}
    default:
      return state
  }
}

export default player
