import isNil from 'qux/lib/isNil'
import omit from 'qux/lib/omit'
import times from 'qux/lib/times'
import util from '../util'
import actionTypes from './actionTypes'

export const songInitialState = Object.freeze({
  id: undefined,
  title: '',
  channels: 8,
  cursor: null,
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
      return {...state, cursor: action.payload.position}
    case actionTypes.MOVE_CURSOR_DOWN:
      return {
        ...state,
        cursor: [
          state.cursor[0],
          Math.min(state.cursor[1] + 1, state.data.length - 1)
        ]
      }
    case actionTypes.SET_CELL:
    case actionTypes.EMPTY_CELL:
      if (isNil(state.cursor))
        return state
      return {
        ...state,
        data: util.replaceAt2d(state.data, state.cursor, action.payload.channel)
      }
    case actionTypes.ADD_LINES:
      return {
        ...state,
        data: [
          ...state.data,
          ...times(action.payload.lines, times(state.channels, null))
        ]
      }
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
    case actionTypes.SET_CELL:
    case actionTypes.EMPTY_CELL:
    case actionTypes.ADD_LINES:
      const {id} = action.payload
      return {
        ...state,
        [id]: song(state[id], action)
      }
    case actionTypes.MOVE_CURSOR_DOWN:
      return {
        ...state,
        [action.payload]: song(state[action.payload], action)
      }
    default:
      return state
  }
}

export default songs