import omit from 'qux/lib/omit'
import without from 'qux/lib/without'
import mapValues from 'qux/lib/mapValues'
import blocks from '../blocks'
import actionTypes from './actionTypes'

export const songInitialState = Object.freeze({
  id: undefined,
  title: '',
  blocks: [],
})

const song = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SONG:
      return {...songInitialState, ...action.payload}
    case actionTypes.ADD_BLOCK:
      return {
        ...state,
        blocks: [...state.blocks, action.payload.block],
      }
    case actionTypes.REMOVE_BLOCK:
      return {
        ...state,
        blocks: without(state.blocks, action.payload.block),
      }
    case blocks.actionTypes.REMOVE_BLOCK:
      return {
        ...state,
        blocks: without(state.blocks, action.payload),
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
        [action.payload.id]: song(undefined, action),
      }
    case actionTypes.REMOVE_SONG:
      return omit(state, action.payload)
    case actionTypes.ADD_BLOCK:
    case actionTypes.REMOVE_BLOCK:
      const {id} = action.payload
      return {
        ...state,
        [id]: song(state[id], action),
      }
    case blocks.actionTypes.REMOVE_BLOCK:
      return mapValues(state, (v) => song(v, action))
    default:
      return state
  }
}

export default songs
