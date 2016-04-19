import values from 'lodash.values'

const getAll = (state) => (
  values(state.channels)
)

export default {getAll}
