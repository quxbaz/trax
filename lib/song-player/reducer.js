import actionTypes from './actionTypes'

export const initialState = Object.freeze({
  playing: false,
  beats: 16,
  beatDuration: 100,
  currentBeat: -1,
  currentSong: undefined,
})

const player = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SONG_PLAYER:
      return {...state, ...action.payload}
    case actionTypes.PLAY:
      return {...state, playing: true}
    case actionTypes.PAUSE:
      return {...state, playing: false}
    case actionTypes.STOP:
      return {...state, playing: false, currentBeat: -1}
    case actionTypes.RESTART:
      return {...state, playing: true, currentBeat: -1}
    case actionTypes.TOGGLE_PLAY:
      return {...state, playing: !state.playing}
    case actionTypes.TICK:
      return {
        ...state,
        currentBeat: state.currentBeat + 1,
      }
    case actionTypes.SET_CURRENT_SONG:
      return {...state, currentSong: action.payload}
    default:
      return state
  }
}

export default player
