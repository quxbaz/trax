import id from '../id'
import actionTypes from './actionTypes'


const createBlip = (state={}) => (dispatch) => {
  return dispatch({
    type: actionTypes.CREATE_BLIP,
    payload: {
      id: dispatch(id.actions.gen(state)),
      ...state,
    },
  })
}

const muteBlip = (id) => ({
  type: actionTypes.MUTE_BLIP,
  payload: id,
})

const unmuteBlip = (id) => ({
  type: actionTypes.UNMUTE_BLIP,
  payload: id,
})

const toggleBlip = (id) => ({
  type: actionTypes.TOGGLE_BLIP,
  payload: id,
})

export default {
  createBlip,
  unmuteBlip, muteBlip,
  toggleBlip,
}
