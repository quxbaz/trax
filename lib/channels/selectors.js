import values from 'qux/lib/values'
import util from '../util'

const getAll = (state) => values(state.channels)

const getById = (id) => (state) => state.channels[id]

const getMany = (ids) => (state) => (
  ids.map((id) => getById(id)(state))
)

const getEnabled = (state) => util.getEnabledChannels(getAll(state))

const isSoloMode = (state) => getAll(state).some(
  c => c.solo
)

export default {
  getAll, getById, getMany,
  getEnabled, isSoloMode,
}
