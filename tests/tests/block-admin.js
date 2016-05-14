import expect from 'expect'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import util from 'trax/lib/util'
import {blocks, blockAdmin, songs, songAdmin} from 'trax'
import {initialState} from 'trax/lib/block-admin/reducer'
import {blockInitialState} from 'trax/lib/blocks/reducer'
import {songInitialState} from 'trax/lib/songs/reducer'

describe("block-admin", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = initialState
      expect(
        blockAdmin.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Sets the current block.", () => {
      const stateBefore = {currentBlock: undefined}
      const action = blockAdmin.actions.setCurrentBlock(1)
      const stateAfter = {currentBlock: 1}
      expect(
        blockAdmin.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    describe("Prev/next", () => {

      let store

      beforeEach(() => {

        const stateBefore = {
          blockAdmin: {currentBlock: undefined},
          blocks: {1: {id: 1}, 2: {id: 2}},
          songAdmin: {currentSong: 10},
          songs: {10: {id: 10, blocks: [1, 2]}},
        }

        store = createStore(
          combineReducers({
            blockAdmin: blockAdmin.reducer,
            blocks: blocks.reducer,
            songAdmin: songAdmin.reducer,
            songs: songs.reducer,
          }),
          stateBefore,
          applyMiddleware(thunk)
        )

      })

      it("Goes to the previous block.", () => {
        store.dispatch(
          blockAdmin.actions.setCurrentBlock(2)
        )
        store.dispatch(
          blockAdmin.actions.prevBlock()
        )
        expect(store.getState().blockAdmin).toEqual({
          currentBlock: 1,
        })
      })

      it("Does not go before the first block.", () => {
        store.dispatch(
          blockAdmin.actions.setCurrentBlock(1)
        )
        store.dispatch(
          blockAdmin.actions.prevBlock()
        )
        expect(store.getState().blockAdmin).toEqual({
          currentBlock: 1,
        })
      })

      it("Goes to the next block.", () => {
        store.dispatch(
          blockAdmin.actions.setCurrentBlock(1)
        )
        store.dispatch(
          blockAdmin.actions.nextBlock()
        )
        expect(store.getState().blockAdmin).toEqual({
          currentBlock: 2,
        })
      })

      it("Does not go past the last block.", () => {
        store.dispatch(
          blockAdmin.actions.setCurrentBlock(2)
        )
        store.dispatch(
          blockAdmin.actions.nextBlock()
        )
        expect(store.getState().blockAdmin).toEqual({
          currentBlock: 2,
        })
      })

      it("It creates a new block if on the last block given an option.", () => {
        const {uuid} = util
        util.uuid = () => 3
        store.dispatch(
          blockAdmin.actions.setCurrentBlock(2)
        )
        store.dispatch(
          blockAdmin.actions.nextBlock(true)
        )
        expect(store.getState()).toEqual({
          blockAdmin: {currentBlock: 3},
          blocks: {1: {id: 1}, 2: {id: 2}, 3: {...blockInitialState, id: 3}},
          songAdmin: {currentSong: 10},
          songs: {10: {id: 10, blocks: [1, 2]}},
        })
        util.uuid = uuid
      })

    })

  })

  describe("selectors", () => {

    describe("getCurrentBlock()", () => {

      it("Gets the current block.", () => {
        const state = {
          blockAdmin: {currentBlock: 1},
          blocks: {
            1: {id: 1}
          },
        }
        const result = {id: 1}
        expect(
          blockAdmin.selectors.getCurrentBlock(state)
        ).toEqual(result)
      })

    })

  })

})
