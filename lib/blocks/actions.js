import id from '../id'
import actionTypes from './actionTypes'

const create = (state) => (dispatch) => {
  return dispatch({
    type: actionTypes.CREATE,
    payload: {
      id: dispatch(id.actions.gen(state)),
      ...state,
    },
  })
}

const destroy = (id) => ({
  type: actionTypes.DESTROY,
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
  create, destroy,
  addChannel, removeChannel,
}
