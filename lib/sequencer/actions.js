import actionTypes from './actionTypes'

const createSequencer = (state) => ({
  type: actionTypes.CREATE_SEQUENCER,
  payload: state
})

export default {
  createSequencer,
}
