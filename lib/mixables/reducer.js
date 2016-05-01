import actionTypes from './actionTypes'

export const initialState = Object.freeze({
  id: undefined,
  sample: undefined,
  // duration: 0,
  offset: 0,
  minOffset: 0,
  maxOffset: 3600,  // 60 seconds
  gain: 1,
  minGain: 0,
  maxGain: 10,
  rate: 1,
  minRate: 0,
  maxRate: 4,
})

const mixable = (state, action) => {
  switch (action.type) {
    case actionTypes.CREATE_MIXABLE:
      return {...initialState, ...action.payload}
    case actionTypes.MIX:
      return {...state, ...action.payload.props}
    default:
      return state
  }
}

const mixables = (state={}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_MIXABLE:
    case actionTypes.MIX:
      const {id} = action.payload
      return {
        ...state,
        [id]: mixable(state[id], action)
      }
    default:
      return state
  }

}

export default mixables
