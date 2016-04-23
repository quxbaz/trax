import actionTypes from './actionTypes'

const createBlip = (state) => ({
  type: actionTypes.CREATE_BLIP,
  payload: state
})

const toggleMuteBlip = (id) => ({
  type: actionTypes.TOGGLE_MUTE_BLIP,
  payload: id
})

export default {createBlip, toggleMuteBlip}
