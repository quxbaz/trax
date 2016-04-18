import util from '../util'

export const getAll = (state) => (
  util.values(state.blips)
)

export const getBlips = (channelId) => (state) => (
  util.values(state.blips)
    .filter(blip => blip.channel === channelId)
)
