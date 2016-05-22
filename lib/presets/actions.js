import isNil from 'qux/lib/isNil'
import id from '../id'
import selectors from './selectors'
import mixables from '../mixables'
import actionTypes from './actionTypes'

const create = (state) => (dispatch) => {

  let mixableId = state.mixable

  // Creates a new mixable if one isn't provided
  if (isNil(mixableId)) {
    mixableId = dispatch(id.actions.gen())
    dispatch(mixables.actions.create({
      id: mixableId,
      sample: state.sample,
    }))
  }

  dispatch({
    type: actionTypes.CREATE,
    payload: {
      id: dispatch(id.actions.gen(state)),
      mixable: mixableId,
      ...state,
    }
  })

}

export const remove = (id) => (dispatch, getState) => {

  const preset = selectors.getById(id)(getState())

  dispatch(
    mixables.actions.remove(preset.mixable)
  )

  dispatch({
    type: actionTypes.REMOVE,
    payload: id
  })

}

export default {create, remove}
