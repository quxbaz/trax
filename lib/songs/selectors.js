import values from 'qux/lib/values'

const getAll = (state) => values(state.songs)
const getById = (id) => (state) => state.songs[id]

export default {getAll, getById}
