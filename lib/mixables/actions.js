import util from '../util'
import actionTypes from './actionTypes'

const createMixable = (state={}) => ({
  type: actionTypes.CREATE_MIXABLE,
  payload: {
    id: util.uuid(),
    ...state
  }
})

export const removeMixable = (id) => ({
  type: actionTypes.REMOVE_MIXABLE,
  payload: id
})

export default {createMixable, removeMixable}
