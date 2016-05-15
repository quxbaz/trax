import isNil from 'qux/lib/isNil'
import util from '../util'
import actionTypes from './actionTypes'
import selectors from './selectors'
import blips from '../blips'
import presets from '../presets'

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

const setBlipAt = (id, i, blipId) => ({
  type: actionTypes.SET_BLIP_AT,
  payload: {
    id,
    position: i,
    blipId
  }
})

const createBlipAt = (id, i, blipState={}) => (dispatch, getState) => {
  /*
     Creates a blip at a position if it doesn't exist.
  */
  const state = getState()
  const channel = selectors.getById(id)(state)
  if (!isNil(channel.blips[i]))
    return
  const {mixable} = presets.selectors.getById(channel.preset)(state)
  const action = blips.actions.createBlip({
    beat: i,
    color: channel.color,
    mixable,
    ...blipState,
  })
  dispatch(action)
  dispatch(setBlipAt(id, i, action.payload.id))
}

// <TODO>
const unmuteBlipAt = (id, i) => (dispatch, getState) => {
  /*
    Creates or unmutes a blip at a position.
  */
  const state = getState()
  const channel = selectors.getById(id)(state)
  if (channel.blips[i]) {
    // <TODO>
    dispatch(blips.actions.unmuteBlip(channel.blips[i]))
  } else {
    dispatch(createBlipAt(id, i))
  }
}

const muteBlipAt = (id, i) => (dispatch, getState) => {
  // <TODO>
}

const toggleBlipAt = (id, i) => (dispatch, getState) => {
  /*
    Toggles a blip at a position if it exists else create one.
  */
  const state = getState()
  const channel = selectors.getById(id)(state)
  if (channel.blips[i]) {
    dispatch(blips.actions.toggleMuteBlip(channel.blips[i]))
  } else {
    dispatch(createBlipAt(id, i))
  }

}

export default {
  createChannel, removeChannel, archiveChannel,
  restoreChannel, toggleMuteChannel, toggleSoloChannel,
  setBlipAt, createBlipAt, unmuteBlipAt, muteBlipAt,
  toggleBlipAt,
}
