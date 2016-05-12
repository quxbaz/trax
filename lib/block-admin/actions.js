import actionTypes from './actionTypes'

const setActiveBlock = (id) => ({
  type: actionTypes.SET_ACTIVE_BLOCK,
  payload: id,
})

export default {
  setActiveBlock,
}
