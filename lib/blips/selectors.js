import values from 'lodash.values'
import pick from 'lodash.pick'

const getAll = (state) => (
  values(state.blips)
)

const getById = (id) => (state) => (
  state.blips[id]
)

export default {getAll, getById}
