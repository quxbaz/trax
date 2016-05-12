import util from '../util'
import actionTypes from './actionTypes'

const createBlock = (state) => ({
  type: actionTypes.CREATE_BLOCK,
  payload: {
    id: util.uuid(),
    ...state,
  }
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
  createBlock,
  addChannel, removeChannel,
}
