import id from '../id'
import actionTypes from './actionTypes'

const create = (state={}) => (dispatch) => {
  return dispatch({
    type: actionTypes.CREATE,
    payload: {
      id: dispatch(id.actions.gen(state)),
      ...state,
    },
  })
}

const mute = (id) => ({
  type: actionTypes.MUTE,
  payload: id,
})

const unmute = (id) => ({
  type: actionTypes.UNMUTE,
  payload: id,
})

const toggle = (id) => ({
  type: actionTypes.TOGGLE,
  payload: id,
})

export default {
  create, unmute, mute, toggle,
}
