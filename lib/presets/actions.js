import util from '../util'
import actionTypes from './actionTypes'

const createPreset = (state={}) => ({
  type: actionTypes.CREATE_PRESET,
  payload: {
    id: util.uuid(),
    ...state
  }
})

export const removePreset = (id) => ({
  type: actionTypes.REMOVE_PRESET,
  payload: id
})

export default {createPreset, removePreset}
