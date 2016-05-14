import songAdmin from '../song-admin'
import blocks from '../blocks'
import actionTypes from './actionTypes'
import selectors from './selectors'

const setCurrentBlock = (id) => ({
  type: actionTypes.SET_CURRENT_BLOCK,
  payload: id,
})

const prevBlock = () => (dispatch, getState) => {

  const state = getState()
  const currentSong = songAdmin.selectors.getCurrentSong(state)
  const currentBlock = selectors.getCurrentBlock(state)
  const index = currentSong.blocks.indexOf(currentBlock.id)
  const prevSong = currentSong.blocks[Math.max(0, index - 1)]

  dispatch({
    type: actionTypes.SET_CURRENT_BLOCK,
    payload: prevSong,
  })

}

const nextBlock = (push=false) => (dispatch, getState) => {

  /*
    @push: If true, creates a new block if the current block is at the
    last index.
  */

  const state = getState()
  const currentSong = songAdmin.selectors.getCurrentSong(state)
  const currentBlock = selectors.getCurrentBlock(state)
  const nBlocks = currentSong.blocks.length
  const index = currentSong.blocks.indexOf(currentBlock.id)
  let nextSong

  if (push && ((index + 1) > (nBlocks - 1))) {
    const action = blocks.actions.createBlock()
    dispatch(action)
    nextSong = action.payload.id
  } else {
    nextSong = currentSong.blocks[Math.min(index + 1, nBlocks - 1)]
  }

  dispatch({
    type: actionTypes.SET_CURRENT_BLOCK,
    payload: nextSong,
  })

}

export default {
  setCurrentBlock,
  prevBlock, nextBlock,
}
