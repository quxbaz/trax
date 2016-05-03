import channels from '../channels'

const isSoloMode = (state) => channels.selectors.getAll(state).some(
  c => c.solo
)

export default {isSoloMode}
