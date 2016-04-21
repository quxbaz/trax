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

export const togglePlay = () => ({
  type: actionTypes.TOGGLE_PLAY
})

export const tick = () => ({
  type: actionTypes.TICK
})

export default {createSequencer, play, pause, togglePlay, tick}
