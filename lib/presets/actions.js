import isNil from 'qux/lib/isNil'
import id from '../id'
import selectors from './selectors'
import mixables from '../mixables'
import actionTypes from './actionTypes'

const createPreset = (state) => (dispatch) => {

  let mixableId = state.mixable

  // Creates a new mixable if one isn't provided
  if (isNil(mixableId)) {
    mixableId = dispatch(id.actions.gen())
    dispatch(mixables.actions.createMixable({
      id: mixableId,
      sample: state.sample,
    }))
  }

  dispatch({
    type: actionTypes.CREATE_PRESET,
    payload: {
      id: dispatch(id.actions.gen(state)),
      mixable: mixableId,
      ...state,
    }
  })

}

export const removePreset = (id) => (dispatch, getState) => {

  const preset = selectors.getById(id)(getState())

  dispatch(
    mixables.actions.removeMixable(preset.mixable)
  )

  dispatch({
    type: actionTypes.REMOVE_PRESET,
    payload: id
  })

}

export default {createPreset, removePreset}
