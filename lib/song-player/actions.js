import actionTypes from './actionTypes'

const createSongPlayer = (state) => ({
  type: actionTypes.CREATE_SONG_PLAYER,
  payload: state,
})

const play = () => ({
  type: actionTypes.PLAY,
})

const pause = () => ({
  type: actionTypes.PAUSE,
})

const stop = () => ({
  type: actionTypes.STOP,
})

const restart = () => ({
  type: actionTypes.RESTART,
})

const togglePlay = () => ({
  type: actionTypes.TOGGLE_PLAY,
})

const tick = () => ({
  type: actionTypes.TICK,
})

const setLoop = (bool) => ({
  type: actionTypes.SET_LOOP,
  payload: bool,
})

const toggleLoop = () => ({
  type: actionTypes.TOGGLE_LOOP,
})

const setCurrentBeat = (beat) => ({
  type: actionTypes.SET_CURRENT_BEAT,
  payload: beat,
})

const setCurrentSong = (id) => ({
  type: actionTypes.SET_CURRENT_SONG,
  payload: id,
})

const clearCurrentSong = () => ({
  type: actionTypes.CLEAR_CURRENT_SONG,
  payload: null,
})

export default {
  createSongPlayer,
  play, pause, stop, restart,
  togglePlay, tick,
  setLoop, toggleLoop, setCurrentBeat,
  setCurrentSong, clearCurrentSong,
}
