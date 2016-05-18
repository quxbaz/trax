import util from '../util'
import actionTypes from './actionTypes'
import selectors from './selectors'

const createSong = (state) => ({
  type: actionTypes.CREATE_SONG,
  payload: {
    id: util.uuid(),
      ...state,
  },
})

const removeSong = (id) => ({
  type: actionTypes.REMOVE_SONG,
  payload: id,
})

const addBlock = (id, block) => ({
  type: actionTypes.ADD_BLOCK,
  payload: {id, block},
})

const removeBlock = (id, block) => ({
  type: actionTypes.REMOVE_BLOCK,
  payload: {id, block},
})

const insertBefore = (id, i, j) => ({
  type: actionTypes.INSERT_BEFORE,
  payload: {id, i, j},
})

export default {
  createSong, removeSong,
  addBlock, removeBlock,
  insertBefore,
}
