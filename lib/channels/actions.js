import times from 'lodash.times'
import util from '../util'
import actionTypes from './actionTypes'
import blips from '../blips'
import {initialState} from './reducer'

const createChannel = (state) => (dispatch) => {
  const mergedState = {...initialState, ...state}
  const blipStates = times(mergedState.beats, (i) => ({
    id: util.uuid(),
    sample: mergedState.sample,
    beat: i
  }))
  dispatch(
    blips.actions.createManyBlips(blipStates)
  )
  dispatch({
    type: actionTypes.CREATE_CHANNEL,
    payload: {
      id: util.uuid(),
      blips: blipStates.map(blipState => blipState.id),
      ...state
    }
  })
}

export const removeChannel = (id) => ({
  type: actionTypes.REMOVE_CHANNEL,
  payload: id
})

export default {createChannel, removeChannel}
