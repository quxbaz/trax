import util from '../util'
import actionTypes from './actionTypes'
import selectors from './selectors'

const createBlock = (state) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.CREATE_BLOCK,
    payload: {
      id: util.uuid(),
        ...state,
    },
    meta: {
      // This is used in block-admin to check if only one block exists
      nBlocks: selectors.getAll(getState()).length,
    },
  })
}

const addChannel = (id, channel) => ({
  type: actionTypes.ADD_CHANNEL,
  payload: {id, channel},
})

const removeChannel = (id, channel) => ({
  type: actionTypes.REMOVE_CHANNEL,
  payload: {id, channel},
})

export default {
  createBlock,
  addChannel, removeChannel,
}
