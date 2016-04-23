import _ from 'lodash'
import expect from 'expect'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {sequencer, channels, blips} from 'trax'
import util from 'trax/lib/util'
import {initialState} from 'trax/lib/channels/reducer'
import {initialState as blipInitialState} from 'trax/lib/blips/reducer'

describe("channel", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = {}
      expect(
        channels.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a channel.", () => {
      const stateBefore = undefined
      const action = channels.actions.createChannel({id: 'foo'})
      const stateAfter = {
        foo: {
          ...initialState,
          id: 'foo'
        }
      }
      expect(
        channels.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    // it("Creates a channel with child blips.", () => {

    //   // Mock uuid function to generate predictable ids
    //   const uuid = util.uuid
    //   let i = 0
    //   util.uuid = () => i++

    //   const store = createStore(
    //     combineReducers({
    //       channels: channels.reducer,
    //       blips: blips.reducer
    //     }),
    //     applyMiddleware(thunk)
    //   )

    //   const action = channels.actions.createChannel({id: 'foo'})
    //   const stateAfter = {
    //     foo: {
    //       ...initialState,
    //       id: 'foo',
    //       blips: _.range(16)
    //     }
    //   }

    //   store.dispatch(action)

    //   expect(
    //     store.getState().channels
    //   ).toEqual(stateAfter)

    //   expect(
    //     Object.keys(store.getState().blips)
    //   ).toEqual(_.range(16).map(i => i.toString()))

    //   expect(
    //     _.values(store.getState().blips).map(
    //       state => state.id
    //     )
    //   ).toEqual(_.range(16))

    //   const storeBlips = store.getState().blips
    //   _.keys(storeBlips).forEach((key) => {
    //     const blip = storeBlips[key]
    //     expect(blip).toEqual({
    //       ...blipInitialState,
    //       beat: parseInt(key),
    //       id: parseInt(key)
    //     })
    //   })

    //   // Restore uuid function
    //   util.uuid = uuid

    // })

    // it("Child blips inherit the sample and color property.", () => {
    //   const store = createStore(
    //     combineReducers({
    //       channels: channels.reducer,
    //       blips: blips.reducer
    //     }),
    //     applyMiddleware(thunk)
    //   )
    //   store.dispatch(channels.actions.createChannel({
    //     sample: 'hihat',
    //     color: 'blue'
    //   }))
    //   expect(
    //     _.values(store.getState().blips).every(
    //       blip => blip.sample === 'hihat' && blip.color === 'blue'
    //     )
    //   ).toBe(true)
    // })

    // it("Child blips have their beat set.", () => {
    //   const store = createStore(
    //     combineReducers({
    //       channels: channels.reducer,
    //       blips: blips.reducer
    //     }),
    //     applyMiddleware(thunk)
    //   )
    //   store.dispatch(channels.actions.createChannel())
    //   let range = _.range(16)
    //   _.values(store.getState().blips).forEach((blip) => {
    //     if (typeof blip.beat === 'number')
    //       range = range.filter(i => i !== blip.beat)
    //   })
    //   expect(range).toEqual([])
    // })

    it("Removes a channel.", () => {
      const stateBefore = {
        1: {id: 1},
        2: {id: 2}
      }
      const action = channels.actions.removeChannel(1)
      const stateAfter = {
        2: {id: 2}
      }
      expect(
        channels.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Archives a channel.", () => {
      const stateBefore = {
        1: {archived: false},
        2: {}
      }
      const action = channels.actions.archiveChannel(1)
      const stateAfter = {
        1: {archived: true},
        2: {}
      }
      expect(
        channels.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Restores an archived channel.", () => {
      const stateBefore = {1: {archived: true}}
      const action = channels.actions.restoreChannel(1)
      const stateAfter = {1: {archived: false}}
      expect(
        channels.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Toggles mute on a channel.", () => {
      const stateBefore = {1: {mute: false}}
      const action = channels.actions.toggleMuteChannel(1)
      const stateAfter = {1: {mute: true}}
      expect(
        channels.reducer(stateBefore, action)
      ).toEqual(stateAfter)
      expect(
        channels.reducer(stateAfter, action)
      ).toEqual(stateBefore)
    })

    it("Toggles solo on a channel.", () => {
      const stateBefore = {1: {solo: false}}
      const action = channels.actions.toggleSoloChannel(1)
      const stateAfter = {1: {solo: true}}
      expect(
        channels.reducer(stateBefore, action)
      ).toEqual(stateAfter)
      expect(
        channels.reducer(stateAfter, action)
      ).toEqual(stateBefore)
    })

    it("Sets a blip at a position.", () => {
      const stateBefore = {
        1: initialState
      }
      const action = channels.actions.setBlipAt(1, 2, 'foobar')
      const stateAfter = {
        1: {
          ...initialState,
          blips: [
            undefined, undefined, 'foobar', undefined,
            undefined, undefined, undefined, undefined,
            undefined, undefined, undefined, undefined,
            undefined, undefined, undefined, undefined
          ]
        }
      }
      expect(
        channels.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    describe("toggleBlipAtPosition", () => {

    })

  })

  describe("selectors", () => {

    describe("getAll()", () => {

      it("Gets all channels.", () => {
        const state = {
          channels: {
            1: {id: 1},
            2: {id: 2}
          }
        }
        const result = [
          {id: 1},
          {id: 2}
        ]
        expect(
          channels.selectors.getAll(state)
        ).toEqual(result)
      })

    })

    describe("getById()", () => {

      it("Gets a channel by id.", () => {
        const state = {
          channels: {
            1: {sample: 'snare'},
            2: {}
          }
        }
        const result = {sample: 'snare'}
        expect(
          channels.selectors.getById(1)(state)
        ).toEqual(result)
      })

    })

    describe("getEnabled()", () => {

      it("Gets channels that are not mute.", () => {
        const state = {
          channels: {
            1: {id: 1, mute: false},
            2: {id: 2, mute: false},
            3: {id: 3, mute: true}
          }
        }
        const result = [
          {id: 1, mute: false},
          {id: 2, mute: false}
        ]
        expect(
          channels.selectors.getEnabled(state)
        ).toEqual(result)
      })

    })

  })

})
