import values from 'qux/lib/values'

const getAll = (state) => values(state.blocks)

const getById = (id) => (state) => state.blocks[id]

export default {
  getAll, getById,
}
