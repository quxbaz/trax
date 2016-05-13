import actionTypes from './actionTypes'
import songs from '../songs'

export const initialState = Object.freeze({
  currentSong: undefined,
})

const songAdmin = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload,
      }
    case songs.actionTypes.CREATE_SONG:
      return {
        ...state,
        currentSong: action.meta.nSongs === 0 ? action.payload.id : state.currentSong,
      }
    default:
      return state
  }
}

export default songAdmin
