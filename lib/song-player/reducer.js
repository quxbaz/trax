import actionTypes from './actionTypes'

export const initialState = Object.freeze({
  beatDuration: 100,
  startLine: 0,
  currentPlayingLine: -1,
})

const player = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SONG_PLAYER:
      return {...state, ...action.payload}
    case actionTypes.SET_START:
      return {
        ...state,
        startLine: action.payload,
      }
    case actionTypes.SET_CURRENT_PLAYING_LINE:
      return {
        ...state,
        currentPlayingLine: action.payload,
      }
    case actionTypes.RESET_CURRENT_PLAYING_LINE:
      return {
        ...state,
        currentPlayingLine: -1,
      }
    case actionTypes.INC_CURRENT_PLAYING_LINE:
      return {
        ...state,
        currentPlayingLine: state.currentPlayingLine + 1
      }
    default:
      return state
  }
}

export default player
