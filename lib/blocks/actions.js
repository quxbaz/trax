import id from '../id'
import actionTypes from './actionTypes'

const createBlock = (state) => (dispatch) => {
  return dispatch({
    type: actionTypes.CREATE_BLOCK,
    payload: {
      id: dispatch(id.actions.gen(state)),
      ...state,
    },
  })
}

const removeBlock = (id) => ({
  type: actionTypes.REMOVE_BLOCK,
  payload: id,
})

const addChannel = (id, channel) => ({
  type: actionTypes.ADD_CHANNEL,
  payload: {id, channel},
})

const removeChannel = (id, channel) => ({
  type: actionTypes.REMOVE_CHANNEL,
  payload: {id, channel},
})

export default {
  createBlock, removeBlock,
  addChannel, removeChannel,
}
