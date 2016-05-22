import id from '../id'
import actionTypes from './actionTypes'
import selectors from './selectors'

const create = (state={}) => (dispatch) => {
  return dispatch({
    type: actionTypes.CREATE,
    payload: {
      id: dispatch(id.actions.gen(state)),
      ...state,
    },
  })
}

const deepCopy = (source, state) => (dispatch) => {
  return dispatch({
    type: actionTypes.DEEP_COPY,
    payload: {
      id: source,
      state: {
        id: dispatch(id.actions.gen(state)),
          ...state,
      },
    },
  })
}

const remove = (id) => ({
  type: actionTypes.REMOVE,
  payload: id
})

const mix = (id, props) => ({
  type: actionTypes.MIX,
  payload: {id, props}
})

export default {
  create, remove, deepCopy,
  mix,
}
