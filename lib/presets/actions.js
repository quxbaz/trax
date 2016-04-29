import util from '../util'
import actionTypes from './actionTypes'
import mixables from '../mixables'

const createPreset = (state) => (dispatch) => {

  let mixableId = state.mixable

  // Creates a new mixable if one isn't provided
  if (!state.mixable) {
    mixableId = util.uuid()
    dispatch(
      mixables.actions.createMixable({
        id: mixableId,
        sample: state.sample,
      })
    )
  }

  dispatch({
    type: actionTypes.CREATE_PRESET,
    payload: {
      id: util.uuid(),
      mixable: mixableId,
      ...state,
    }
  })

}

export const removePreset = (id) => ({
  type: actionTypes.REMOVE_PRESET,
  payload: id
})

export default {createPreset, removePreset}
