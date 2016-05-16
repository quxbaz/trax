import expect from 'expect'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {channels, blocks} from 'trax'
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
      const action = blocks.actions.createBlock({id: 'foo'})
      const stateAfter = {
        foo: {
          ...blockInitialState,
          id: 'foo',
        }
      }
      expect(
        blocks.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Removes a block.", () => {
      const stateBefore = {
        1: {id: 1},
        2: {id: 2}
      }
      const action = blocks.actions.removeBlock(1)
      const stateAfter = {
        2: {id: 2}
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

    it("Removes a channel from a block when the channel is removed.", () => {
      const store = createStore(
        combineReducers({
          channels: channels.reducer,
          blocks: blocks.reducer,
        }), {
          channels: {a: {}},
          blocks: {1: {channels: ['a', 'b']}},
        }
      )
      store.dispatch(channels.actions.removeChannel('a'))
      expect(store.getState().blocks[1]).toEqual({
        channels: ['b']
      })
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

    describe("getEnabledChannels()", () => {

      it("Gets channels that are not mute.", () => {
        const state = {
          blocks: {
            0: {channels: [1, 2, 3]},
          },
          channels: {
            1: {id: 1, mute: false},
            2: {id: 2, mute: false},
            3: {id: 3, mute: true},
          }
        }
        const result = [
          {id: 1, mute: false},
          {id: 2, mute: false},
        ]
        expect(
          blocks.selectors.getEnabledChannels(0)(state)
        ).toEqual(result)
      })

      it("Gets channels that are not archived.", () => {
        const state = {
          blocks: {
            0: {channels: [1, 2]},
          },
          channels: {
            1: {id: 1, mute: false, archived: true},
            2: {id: 2, mute: false, archived: false},
          }
        }
        const result = [
          {id: 2, mute: false, archived: false},
        ]
        expect(
          blocks.selectors.getEnabledChannels(0)(state)
        ).toEqual(result)
      })

      it("Gets only channels that are soloing even if they are mute, but does not get archived channels.", () => {
        const state = {
          blocks: {
            0: {channels: [1, 2, 3, 4, 5]},
          },
          channels: {
            1: {id: 1, mute: false, solo: true},
            2: {id: 2, mute: true, solo: true},
            3: {id: 3, solo: true},
            4: {id: 4, solo: false},
            5: {id: 5, solo: true, archived: true},
          },
        }
        const result = [
          {id: 1, mute: false, solo: true},
          {id: 2, mute: true, solo: true},
          {id: 3, solo: true},
        ]
        expect(
          blocks.selectors.getEnabledChannels(0)(state)
        ).toEqual(result)
      })

    })

    describe("isSoloMode", () => {

      it("Returns false if no channels are in solo mode.", () => {
        const state = {
          channels: {
            0: {solo: false},
            1: {solo: true},
          },
          blocks: {
            1: {channels: [0]},
          },
        }
        expect(
          blocks.selectors.isSoloMode(1)(state)
        ).toBe(false)
      })

      it("Returns true if any channels are in solo mode.", () => {
        const state = {
          channels: {
            0: {solo: true},
            1: {solo: false},
          },
          blocks: {
            1: {channels: [0, 1]},
          },
        }
        expect(
          blocks.selectors.isSoloMode(1)(state)
        ).toBe(true)
      })

    })

  })

})
