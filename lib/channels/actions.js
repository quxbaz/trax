import times from 'lodash.times'
import util from '../util'
import actionTypes from './actionTypes'
import blips from '../blips'
import {initialState} from './reducer'

const createChannel = (state) => (dispatch) => {
  const mergedState = {...initialState, ...state}
  const blipStates = times(mergedState.beats, () => ({
    id: util.uuid(),
    sample: mergedState.sample
  }))
  dispatch(blips.actions.createManyBlips(blipStates))
  dispatch({
    type: actionTypes.CREATE_CHANNEL,
    payload: {
      ...state,
      blips: blipStates.map(blipState => blipState.id)
    }
  })
}

export default {createChannel}
