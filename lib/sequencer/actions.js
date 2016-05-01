import actionTypes from './actionTypes'
import util from '../util'

const createSequencer = (state) => ({
  type: actionTypes.CREATE_SEQUENCER,
  payload: {id: util.uuid(), ...state}
})

const play = () => ({
  type: actionTypes.PLAY
})

const pause = () => ({
  type: actionTypes.PAUSE
})

const togglePlay = () => ({
  type: actionTypes.TOGGLE_PLAY
})

const tick = () => ({
  type: actionTypes.TICK
})

export default {createSequencer, play, pause, togglePlay, tick}
