import actionTypes from './actionTypes'
import channel from '../channels'
import uuid from '../util'

export const create = () => ({
  type: actionTypes.CREATE,
  payload: {id: uuid.v4()}
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

export const addChannel = (state) => ({
  type: channel.actionTypes.CREATE,
  payload: {...state, id: uuid.v4()}
})

export default {play, pause, step, tick, addChannel}
