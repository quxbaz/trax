import actionTypes from './actionTypes'

const createBlip = (state) => ({
  type: actionTypes.CREATE_BLIP,
  payload: state
})

const createManyBlips = (blipStates) => ({
  type: actionTypes.CREATE_MANY_BLIPS,
  payload: blipStates
})

export default {createBlip, createManyBlips}
