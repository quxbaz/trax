import actionTypes from './actionTypes'

const createSongPlayer = (state) => ({
  type: actionTypes.CREATE_SONG_PLAYER,
  payload: state
})

export default {
  createSongPlayer,
}
