import expect from 'expect'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
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

    it("Sets the active block.", () => {
      const stateBefore = {activeBlock: undefined}
      const action = blockAdmin.actions.setActiveBlock(1)
      const stateAfter = {activeBlock: 1}
      expect(
        blockAdmin.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

  describe("selectors", () => {

    describe("getActiveBlock()", () => {

      it("Gets the active block.", () => {
        const state = {
          blockAdmin: {activeBlock: 1},
          blocks: {
            1: {id: 1}
          },
        }
        const result = {id: 1}
        expect(
          blockAdmin.selectors.getActiveBlock(state)
        ).toEqual(result)
      })

    })

  })

})
