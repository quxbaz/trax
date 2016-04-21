import values from 'lodash.values'

const getAll = (state) => (
  values(state.channels)
)

const getEnabled = (state) => (
  values(state.channels).filter(
    channel => !channel.mute
  )
)

export default {getAll, getEnabled}
