import {blip} from 'trax'
import {initialState} from 'trax/lib/channels/reducer'

const defaultBlips = (() => {
  const blips = []
  for (let i=0; i < initialState.beats; i++) {
    blips.push(blip.reducer(undefined, {
      type: blip.actionTypes.CREATE_BLIP,
      payload: {beat: i}
    }))
  }
  return blips
}).call()

Object.freeze(defaultBlips)

export {defaultBlips}
