import util from '../util'

export const getAll = (state) => (
  util.values(state.channels)
)
