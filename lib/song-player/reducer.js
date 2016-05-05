import actionTypes from './actionTypes'

export const initialState = Object.freeze({
  beatDuration: 100,
  startLine: 0,
})

const player = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SONG_PLAYER:
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default player
