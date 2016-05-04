import actionTypes from './actionTypes'

const createPlayer = (state) => ({
  type: actionTypes.CREATE_PLAYER,
  payload: state
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

export default {
  createPlayer,
  play, pause, togglePlay,
  tick,
}
