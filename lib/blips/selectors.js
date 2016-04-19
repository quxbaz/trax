import values from 'lodash.values'
import pick from 'lodash.pick'

const getAll = (state) => (
  values(state.blips)
)

// Retrieve blips by id
const getSome = (ids) => (state) => {

  ids = [].concat(ids)

  return values(
    pick(state.blips, ids)
  )

}

export default {getAll, getSome}
