import times from 'qux/lib/times'
import util from '../util'
import actionTypes from './actionTypes'
import selectors from './selectors'
import blips from '../blips'
import presets from '../presets'
import {initialState} from './reducer'

const createChannel = (state) => ({
  type: actionTypes.CREATE_CHANNEL,
  payload: {
    id: util.uuid(),
    ...state
  }
})

const removeChannel = (id) => ({
  type: actionTypes.REMOVE_CHANNEL,
  payload: id
})

const archiveChannel = (id) => ({
  type: actionTypes.ARCHIVE_CHANNEL,
  payload: id
})

const restoreChannel = (id) => ({
  type: actionTypes.RESTORE_CHANNEL,
  payload: id
})

const toggleMuteChannel = (id) => ({
  type: actionTypes.TOGGLE_MUTE_CHANNEL,
  payload: id
})

const toggleSoloChannel = (id) => ({
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

  const state = getState()
  const channel = selectors.getById(channelId)(state)

  if (channel.blips[i]) {
    dispatch(blips.actions.toggleMuteBlip(channel.blips[i]))
  } else {
    const {mixable} = presets.selectors.getById(channel.preset)(state)
    const blipId = util.uuid()
    dispatch(blips.actions.createBlip({
      id: blipId,
      beat: i,
      color: channel.color,
      mixable,
    }))
    dispatch(setBlipAt(channelId, i, blipId))
  }

}

export default {
  createChannel, removeChannel, archiveChannel,
  restoreChannel, toggleMuteChannel, toggleSoloChannel,
  setBlipAt, toggleBlipAt
}
