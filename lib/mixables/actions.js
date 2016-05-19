import id from '../id'
import actionTypes from './actionTypes'

const createMixable = (state={}) => (dispatch) => {
  return dispatch({
    type: actionTypes.CREATE_MIXABLE,
    payload: {
      id: dispatch(id.actions.gen(state)),
      ...state,
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

export default {createMixable, removeMixable, mix}
