import omit from 'qux/lib/omit'
import actionTypes from './actionTypes'

export const songInitialState = Object.freeze({
  id: undefined,
  title: '',
  channels: 8,
  cursor: [null, null],
  data: [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ],
})

const song = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SONG:
      return {...songInitialState, ...action.payload}
    case actionTypes.SET_CURSOR:
      return{...state, cursor: action.payload.position}
    default:
      return state
  }
}

const songs = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SONG:
      return {
        ...state,
        [action.payload.id]: song(undefined, action)
      }
    case actionTypes.REMOVE_SONG:
      return omit(state, action.payload)
    case actionTypes.SET_CURSOR:
      const {id} = action.payload
      return {
        ...state,
        [id]: song(state[id], action)
      }
    default:
      return state
  }
}

export default songs
