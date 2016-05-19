import id from '../id'
import blocks from '../blocks'
import actionTypes from './actionTypes'
import selectors from './selectors'

const createSong = (state={}) => (dispatch) => {
  return dispatch({
    type: actionTypes.CREATE_SONG,
    payload: {
      id: dispatch(id.actions.gen(state)),
      ...state,
    },
  })
}

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

const moveBlock = (id, from, to) => ({
  type: actionTypes.MOVE_BLOCK,
  payload: {id, from, to},
})

const createBlock = (id, state) => (dispatch) => {
  const action = dispatch(blocks.actions.createBlock({
    song: id,
    ...state,
  }))
  dispatch(addBlock(id, action.payload.id))
}

export default {
  createSong, removeSong,
  addBlock, removeBlock,
  moveBlock, createBlock,
}
