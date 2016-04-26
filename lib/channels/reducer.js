import omit from 'qux/lib/omit'
import util from '../util'
import actionTypes from './actionTypes'

export const initialState = Object.freeze({
  number: undefined,
  title: undefined,
  sample: undefined,
  color: undefined,
  beats: 16,
  mute: false,
  solo: false,
  archived: false,
  blips: Object.freeze([
    null, null, null, null,
    null, null, null, null,
    null, null, null, null,
    null, null, null, null
  ])
})

const channel = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CHANNEL:
      return {...initialState, ...action.payload}
    case actionTypes.ARCHIVE_CHANNEL:
      return {...state, archived: true}
    case actionTypes.RESTORE_CHANNEL:
      return {...state, archived: false}
    case actionTypes.TOGGLE_MUTE_CHANNEL:
      return {...state, mute: !state.mute}
    case actionTypes.TOGGLE_SOLO_CHANNEL:
      return {...state, solo: !state.solo}
    case actionTypes.SET_BLIP_AT:
      var {position, blipId} = action.payload
      return {
          ...state,
        blips: util.replaceAt(state.blips, position, blipId)
      }
    default:
      return state
  }
}

const channels = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CHANNEL:
      return {
        ...state,
        [action.payload.id]: channel(undefined, action)
      }
    case actionTypes.REMOVE_CHANNEL:
      return omit(state, action.payload)
    case actionTypes.ARCHIVE_CHANNEL:
    case actionTypes.RESTORE_CHANNEL:
    case actionTypes.TOGGLE_MUTE_CHANNEL:
    case actionTypes.TOGGLE_SOLO_CHANNEL:
      return {
        ...state,
        [action.payload]: channel(state[action.payload], action)
      }
    case actionTypes.SET_BLIP_AT:
      var {channelId} = action.payload
      return {
        ...state,
        [channelId]: channel(state[channelId], action)
      }
    default:
      return state
  }
}

export default channels
