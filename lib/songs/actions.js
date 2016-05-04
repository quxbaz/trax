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

const setCursor = (id, position) => ({
  type: actionTypes.SET_CURSOR,
  payload: {id, position}
})

const setCell = (id, channel) => ({
  type: actionTypes.SET_CELL,
  payload: {id, channel}
})

const emptyCell = (id) => ({
  type: actionTypes.EMPTY_CELL,
  payload: {id, channel: null}
})

const addLines = (id, lines=4) => ({
  type: actionTypes.ADD_LINES,
  payload: {id, lines}
})

export default {
  createSong, removeSong,
  setCursor, setCell, emptyCell,
  addLines,
}
