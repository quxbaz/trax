import util from '../util'
import actionTypes from './actionTypes'

const createBlip = (state) => ({
  type: actionTypes.CREATE_BLIP,
  payload: {
    id: util.uuid(),
    ...state,
  },
})

const toggleMuteBlip = (id) => ({
  type: actionTypes.TOGGLE_MUTE_BLIP,
  payload: id,
})

export default {createBlip, toggleMuteBlip}
