import actionTypes from './actionTypes'

const createSongPlayer = (state) => ({
  type: actionTypes.CREATE_SONG_PLAYER,
  payload: state
})

const play = () => ({
  type: actionTypes.PLAY
})

const pause = () => ({
  type: actionTypes.PAUSE
})

const stop = () => ({
  type: actionTypes.STOP
})

const restart = () => ({
  type: actionTypes.RESTART
})

const togglePlay = () => ({
  type: actionTypes.TOGGLE_PLAY
})

const tick = () => ({
  type: actionTypes.TICK
})

export default {
  createSongPlayer,
  play, pause, stop, restart,
  togglePlay, tick,
}
