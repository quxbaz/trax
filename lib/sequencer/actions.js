import actionTypes from './actionTypes'
import channel from '../channel'

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
  type: channel.actionTypes.CREATE_CHANNEL,
  payload: state
})

export default {play, pause, step, tick, addChannel}
