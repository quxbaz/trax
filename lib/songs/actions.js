import util from '../util'
import actionTypes from './actionTypes'

const createSong = (state) => ({
  type: actionTypes.CREATE_SONG,
  payload: {
    id: util.uuid(),
    ...state,
  }
})

const removeSong = (id) => ({
  type: actionTypes.REMOVE_SONG,
  payload: id
})

export default {createSong, removeSong}
