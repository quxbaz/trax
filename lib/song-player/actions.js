import actionTypes from './actionTypes'

const createSongPlayer = (state) => ({
  type: actionTypes.CREATE_SONG_PLAYER,
  payload: state
})

const setStart = (line) => ({
  type: actionTypes.SET_START,
  payload: line
})

export default {
  createSongPlayer,
  setStart,
}
