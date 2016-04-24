import times from 'lodash.times'
import util from '../util'
import actionTypes from './actionTypes'
import selectors from './selectors'
import blips from '../blips'
import {initialState} from './reducer'

const createChannel = (state) => ({
  type: actionTypes.CREATE_CHANNEL,
  payload: {
    id: util.uuid(),
    ...state
  }
})

export const removeChannel = (id) => ({
  type: actionTypes.REMOVE_CHANNEL,
  payload: id
})

export const archiveChannel = (id) => ({
  type: actionTypes.ARCHIVE_CHANNEL,
  payload: id
})

export const restoreChannel = (id) => ({
  type: actionTypes.RESTORE_CHANNEL,
  payload: id
})

export const toggleMuteChannel = (id) => ({
  type: actionTypes.TOGGLE_MUTE_CHANNEL,
  payload: id
})

export const toggleSoloChannel = (id) => ({
  type: actionTypes.TOGGLE_SOLO_CHANNEL,
  payload: id
})

const setBlipAt = (channelId, i, blipId) => ({
  type: actionTypes.SET_BLIP_AT,
  payload: {
    channelId,
    position: i,
    blipId
  }
})

const toggleBlipAt = (channelId, i) => (dispatch, getState) => {
  /*
    Toggles a blip at a position if it exists else create one.
  */
  const channel = selectors.getById(channelId)(getState())
  if (channel.blips[i] !== undefined) {
    dispatch(blips.actions.toggleMuteBlip(channel.blips[i]))
  } else {
    const blipId = util.uuid()
    dispatch(blips.actions.createBlip({
      id: blipId,
      beat: i,
      sample: channel.sample,
      color: channel.color
    }))
    dispatch(setBlipAt(channelId, i, blipId))
  }
}

export default {
  createChannel, removeChannel, archiveChannel,
  restoreChannel, toggleMuteChannel, toggleSoloChannel,
  setBlipAt, toggleBlipAt
}
