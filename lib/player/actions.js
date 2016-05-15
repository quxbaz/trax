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

const tick = () => ({
  type: actionTypes.TICK,
})

const setCurrentBlock = (id) => ({
  type: actionTypes.SET_CURRENT_BLOCK,
  payload: id,
})

export default {
  createPlayer,
  play, pause, togglePlay,
  tick, setCurrentBlock,
}
