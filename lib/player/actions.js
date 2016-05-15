import actionTypes from './actionTypes'

const createPlayer = (state) => ({
  type: actionTypes.CREATE_PLAYER,
  payload: state,
})

const play = () => ({
  type: actionTypes.PLAY,
})

const pause = () => ({
  type: actionTypes.PAUSE,
})

const togglePlay = () => ({
  type: actionTypes.TOGGLE_PLAY,
})

const setCurrentBeat = (beat) => ({
  type: actionTypes.SET_CURRENT_BEAT,
  payload: beat,
})

const restart = () => ({
  type: actionTypes.RESTART,
})

const tick = () => ({
  type: actionTypes.TICK,
})

const setCurrentBlock = (id) => ({
  type: actionTypes.SET_CURRENT_BLOCK,
  payload: id,
})

const clearCurrentBlock = () => ({
  type: actionTypes.CLEAR_CURRENT_BLOCK,
  payload: null,
})

export default {
  createPlayer,
  play, pause, togglePlay,
  setCurrentBeat, restart, tick,
  setCurrentBlock, clearCurrentBlock,
}
