import blocks from '../blocks'

const getCurrentBlock = (state) => (
  blocks.selectors.getById(
    state.blockAdmin.currentBlock
  )(state)
)

export default {
  getCurrentBlock,
}
