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

    it("Creates a bare channel.", () => {
      const action = {
        type: channels.actionTypes.CREATE_CHANNEL,
        payload: {id: 'foo'}
      }
      const stateBefore = undefined
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

    it("Creates a channel with child blips.", () => {

      // Mock uuid function to generate predictable ids
      const uuid = util.uuid
      let i = 0
      util.uuid = () => i++

      const store = createStore(
        combineReducers({
          channels: channels.reducer,
          blips: blips.reducer
        }),
        applyMiddleware(thunk)
      )

      const action = channels.actions.createChannel({id: 'foo'})
      const stateAfter = {
        foo: {
          ...initialState,
          id: 'foo',
          blips: _.range(16)
        }
      }

      store.dispatch(action)

      expect(
        store.getState().channels
      ).toEqual(stateAfter)

      expect(
        Object.keys(store.getState().blips)
      ).toEqual(_.range(16).map(i => i.toString()))

      expect(
        _.values(store.getState().blips).map(
          state => state.id
        )
      ).toEqual(_.range(16))

      const storeBlips = store.getState().blips
      _.keys(storeBlips).forEach((key) => {
        const blip = storeBlips[key]
        expect(blip).toEqual({
          ...blipInitialState,
          beat: parseInt(key),
          id: parseInt(key)
        })
      })

      // Restore uuid function
      util.uuid = uuid

    })

    it("Child blips inherit the sample property.", () => {
      const store = createStore(
        combineReducers({
          channels: channels.reducer,
          blips: blips.reducer
        }),
        applyMiddleware(thunk)
      )
      store.dispatch(channels.actions.createChannel({
        sample: 'hihat'
      }))
      expect(
        _.values(store.getState().blips).every(
          blip => blip.sample === 'hihat'
        )
      ).toBe(true)
    })

    it("Child blips have their beat set.", () => {
      const store = createStore(
        combineReducers({
          channels: channels.reducer,
          blips: blips.reducer
        }),
        applyMiddleware(thunk)
      )
      store.dispatch(channels.actions.createChannel())
      let range = _.range(16)
      _.values(store.getState().blips).forEach((blip) => {
        if (typeof blip.beat === 'number')
          range = range.filter(i => i !== blip.beat)
      })
      expect(range).toEqual([])
    })

    it("Removes a channel.", () => {
      const stateBefore = {
        1: {id: 1},
        2: {id: 2}
      }
      const action = sequencer.actions.removeChannel(1)
      const stateAfter = {
        2: {id: 2}
      }
      expect(
        channels.reducer(stateBefore, action)
      ).toEqual(stateAfter)
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

  })

})
