import values from 'qux/lib/values'
import channels from '../channels'

const getAll = (state) => values(state.blocks)

const getById = (id) => (state) => state.blocks[id]

const getChannels = (id) => (state) => (
  getById(id)(state).channels.map((channel) => (
    channels.selectors.getById(channel)(state)
  ))
)

export default {
  getAll, getById,
  getChannels,
}
