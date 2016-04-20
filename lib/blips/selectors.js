import values from 'lodash.values'
import pick from 'lodash.pick'

const getAll = (state) => (
  values(state.blips)
)

const getById = (id) => (state) => (
  state.blips[id]
)

// Retrieve blips by id
const getSome = (ids) => (state) => {

  ids = [].concat(ids)

  return values(
    pick(state.blips, ids)
  )

}

export default {getAll, getById, getSome}
