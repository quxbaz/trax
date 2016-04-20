import actionTypes from './actionTypes'
import util from '../util'

export const createSequencer = (state) => ({
  type: actionTypes.CREATE_SEQUENCER,
  payload: {id: util.uuid(), ...state}
})

export const play = () => ({
  type: actionTypes.PLAY
})

export const pause = () => ({
  type: actionTypes.PAUSE
})

export const step = () => ({
  type: actionTypes.STEP
})

// // This has no effect on state
// export const playCurrentBeat = () => {

// }

// Plays a beat and moves onto the next one.
export const tick = () => (dispatch) => {
  dispatch(step())
  // play beatCurrentBeat?
}

export default {createSequencer, play, pause, step, tick}
