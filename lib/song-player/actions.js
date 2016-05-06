import actionTypes from './actionTypes'

const createSongPlayer = (state) => ({
  type: actionTypes.CREATE_SONG_PLAYER,
  payload: state
})

const setStart = (line) => ({
  type: actionTypes.SET_START,
  payload: line
})

const setCurrentPlayingLine = (n) => ({
  type: actionTypes.SET_CURRENT_PLAYING_LINE,
  payload: n
})

const resetCurrentPlayingLine = () => ({
  type: actionTypes.RESET_CURRENT_PLAYING_LINE
})

const incCurrentPlayingLine = () => ({
  type: actionTypes.INC_CURRENT_PLAYING_LINE
})

export default {
  createSongPlayer,
  setStart,
  setCurrentPlayingLine, resetCurrentPlayingLine, incCurrentPlayingLine,
}
