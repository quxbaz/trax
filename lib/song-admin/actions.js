import actionTypes from './actionTypes'

const setCurrentSong = (id) => ({
  type: actionTypes.SET_CURRENT_SONG,
  payload: id,
})

export default {
  setCurrentSong,
}
