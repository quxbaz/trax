import values from 'qux/lib/values'

const getAll = (state) => values(state.channels)

const getById = (id) => (state) => state.channels[id]

const getEnabled = (state) => (
  values(state.channels).filter(
    channel => !channel.mute
  )
)

export default {getAll, getById, getEnabled}
