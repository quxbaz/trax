import blocks from '../blocks'

const getActiveBlock = (state) => (
  blocks.selectors.getById(
    state.blockAdmin.activeBlock
  )(state)
)

export default {
  getActiveBlock,
}
