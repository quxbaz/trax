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
    default:
      return state
  }
}

export default songAdmin
