import expect from 'expect'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {sequencer, channels, blips, presets, mixables} from 'trax'
import util from 'trax/lib/util'
import {initialState} from 'trax/lib/channels/reducer'
import {initialState as blipInitialState} from 'trax/lib/blips/reducer'
import {initialState as presetInitialState} from 'trax/lib/presets/reducer'

describe("channels", () => {

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
        1: {archived: true, solo: false},
        2: {}
      }
      expect(
        channels.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Archived channels set false to solo property.", () => {
      const stateBefore = {
        1: {archived: false, solo: true},
      }
      const action = channels.actions.archiveChannel(1)
      const stateAfter = {
        1: {archived: true, solo: false},
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
      const action = channels.actions.setBlipAt(1, 2, 'fo')
      const stateAfter = {
        1: {
          ...initialState,
          blips: [
            null, null, 'fo', null,
            null, null, null, null,
            null, null, null, null,
            null, null, null, null
          ]
        }
      }
      expect(
        channels.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    describe("toggleBlipAt", () => {

      let store

      beforeEach(() => {
        store = createStore(
          combineReducers({
            channels: channels.reducer,
            blips: blips.reducer
          }),
          applyMiddleware(thunk)
        )
      })

      it("Toggles an existing blip at a position.", () => {
        store.dispatch(blips.actions.createBlip({id: 'foo'}))
        store.dispatch(channels.actions.createChannel({
          id: 1,
          blips: util.replaceAt(initialState.blips, 15, 'foo')
        }))
        const action = channels.actions.toggleBlipAt(1, 15)
        const channelsAfter = {
          1: {
            ...initialState,
            id: 1,
            blips: util.replaceAt(initialState.blips, 15, 'foo')
          }
        }
        store.dispatch(action)
        expect(
          store.getState()
        ).toEqual({
          channels: channelsAfter,
          blips: {
            foo: {...blipInitialState, id: 'foo', mute: true}
          }
        })
      })

      it("Creates a blip at a position with a beat set that inherits color, and mixable.", () => {

        const uuid = util.uuid
        util.uuid = () => 42

        store = createStore(
          combineReducers({
            channels: channels.reducer,
            blips: blips.reducer,
            presets: presets.reducer,
          }),
          applyMiddleware(thunk)
        )

        const beat = 0
        const color = 'red'
        const mixable = 'mixableid'
        const preset = 'presetid'

        store.dispatch(presets.actions.createPreset({
          id: preset,
          mixable,
        }))

        store.dispatch(channels.actions.createChannel({
          id: 1,
          color,
          preset: preset,
        }))

        const action = channels.actions.toggleBlipAt(1, beat)

        const channelsAfter = {
          1: {
            ...initialState,
            id: 1,
            color, preset,
            blips: util.replaceAt(initialState.blips, beat, 42),
          }
        }

        store.dispatch(action)

        expect(
          store.getState()
        ).toEqual({
          channels: channelsAfter,
          blips: {
            42: {
              ...blipInitialState,
              id: 42, mute: false, beat,
              color, mixable,
            }
          },
          presets: {
            [preset]: {
              ...presetInitialState,
              id: preset,
              mixable,
            }
          }
        })

        util.uuid = uuid

      })

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
            1: {title: 'whoa'},
            2: {}
          }
        }
        const result = {title: 'whoa'}
        expect(
          channels.selectors.getById(1)(state)
        ).toEqual(result)
      })

    })

    describe("getMany()", () => {

      it("Gets multiple channels by id.", () => {
        const state = {
          channels: {
            1: {id: 1},
            2: {id: 2},
            3: {id: 3},
          }
        }
        const result = [{id: 1}, {id: 3}]
        expect(
          channels.selectors.getMany([1, 3])(state)
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

      it("Gets channels that are not archived.", () => {
        const state = {
          channels: {
            1: {id: 1, mute: false, archived: true},
            2: {id: 2, mute: false, archived: false}
          }
        }
        const result = [
          {id: 2, mute: false, archived: false}
        ]
        expect(
          channels.selectors.getEnabled(state)
        ).toEqual(result)
      })

      it("Gets only channels that are soloing even if they are mute, but does not get archived channels.", () => {
        const state = {
          channels: {
            1: {id: 1, mute: false, solo: true},
            2: {id: 2, mute: true, solo: true},
            3: {id: 3, solo: true},
            4: {id: 4, solo: false},
            5: {id: 5, solo: true, archived: true}
          }
        }
        const result = [
          {id: 1, mute: false, solo: true},
          {id: 2, mute: true, solo: true},
          {id: 3, solo: true}
        ]
        expect(
          channels.selectors.getEnabled(state)
        ).toEqual(result)
      })

    })

    describe("isSoloMode", () => {

      it("Returns false if no channels are in solo mode.", () => {
        const state = {
          channels: {
            0: {solo: false}
          }
        }
        expect(
          channels.selectors.isSoloMode(state)
        ).toBe(false)
      })

      it("Returns true if any channels are in solo mode.", () => {
        const state = {
          channels: {
            0: {solo: true},
            1: {solo: false}
          }
        }
        expect(
          channels.selectors.isSoloMode(state)
        ).toBe(true)
      })

    })

  })

})
