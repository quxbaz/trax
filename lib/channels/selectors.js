import values from 'qux/lib/values'

const getAll = (state) => values(state.channels)

const getById = (id) => (state) => state.channels[id]

const getEnabled = (state) => {
  const channels = getAll(state)
  const soloChannels = channels.filter(c => c.solo && !c.archived)
  if (soloChannels.length > 0)
    return soloChannels
  else
    return channels.filter(c => !c.mute && !c.archived)
}

const isSoloMode = (state) => getAll(state).some(
  c => c.solo
)

export default {
  getAll, getById,
  getEnabled,
  isSoloMode,
}
