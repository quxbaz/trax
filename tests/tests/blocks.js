import expect from 'expect'
import {blocks} from 'trax'
import {blockInitialState} from 'trax/lib/blocks/reducer'

describe("blocks", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = {}
      expect(
        blocks.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a block.", () => {
      const stateBefore = undefined
      const action = blocks.actions.createBlock({id: 1, name: 'foo'})
      const stateAfter = {
        1: {
          ...blockInitialState,
          id: 1,
          name: 'foo',
        }
      }
      expect(
        blocks.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Adds a channel to a block.", () => {
      const stateBefore = {
        b: {channels: []}
      }
      const action = blocks.actions.addChannel('b', 'c')
      const stateAfter = {
        b: {channels: ['c']}
      }
      expect(
        blocks.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Removes a channel from a block.", () => {
      const stateBefore = {
        b: {channels: ['c']}
      }
      const action = blocks.actions.removeChannel('b', 'c')
      const stateAfter = {
        b: {channels: []}
      }
      expect(
        blocks.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

  describe("selectors", () => {

    describe("getAll()", () => {

      it("Gets all blocks.", () => {
        const state = {
          blocks: {
            1: {id: 1},
            2: {id: 2}
          }
        }
        const result = [
          {id: 1},
          {id: 2}
        ]
        expect(
          blocks.selectors.getAll(state)
        ).toEqual(result)
      })

    })

    describe("getById()", () => {

      it("Gets a block by id.", () => {
        const state = {
          blocks: {
            1: {title: 'whoa'},
            2: {}
          }
        }
        const result = {title: 'whoa'}
        expect(
          blocks.selectors.getById(1)(state)
        ).toEqual(result)
      })

    })

    describe("getChannels()", () => {

      it("Gets the channels of a block.", () => {
        const state = {
          blocks: {
            1: {channels: [2, 3]},
          },
          channels: {
            2: {id: 2},
            3: {id: 3},
            4: {id: 4},
          }
        }
        const result = [
          {id: 2},
          {id: 3},
        ]
        expect(
          blocks.selectors.getChannels(1)(state)
        ).toEqual(result)

      })

    })

  })

})
