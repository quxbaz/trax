import id from '../id'
import actionTypes from './actionTypes'
import selectors from './selectors'

const createMixable = (state={}) => (dispatch) => {
  return dispatch({
    type: actionTypes.CREATE_MIXABLE,
    payload: {
      id: dispatch(id.actions.gen(state)),
      ...state,
    },
  })
}

const deepCopyMixable = (source, state) => (dispatch) => {
  return dispatch({
    type: actionTypes.DEEP_COPY_MIXABLE,
    payload: {
      id: source,
      state: {
        id: dispatch(id.actions.gen(state)),
          ...state,
      },
    },
  })
}

const removeMixable = (id) => ({
  type: actionTypes.REMOVE_MIXABLE,
  payload: id
})

const mix = (id, props) => ({
  type: actionTypes.MIX,
  payload: {id, props}
})

export default {
  createMixable, removeMixable, deepCopyMixable,
  mix,
}
