import expect from 'expect'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {presets, mixables} from 'trax'
import util from 'trax/lib/util'
import {initialState} from 'trax/lib/presets/reducer'
import {initialState as mixableInitialState} from 'trax/lib/mixables/reducer'

describe("presets", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = {}
      expect(
        presets.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    describe("createPreset", () => {

      let store

      beforeEach(() => {
        store = createStore(
          combineReducers({
            presets: presets.reducer,
            mixables: mixables.reducer,
          }),
          applyMiddleware(thunk)
        )
      })

      it("Creates a preset and a default mixable that inherits some properties.", () => {

        // Mock util.uuid
        const uuid = util.uuid
        util.uuid = () => 42

        store.dispatch(presets.actions.createPreset({
          id: 1,
          sample: 'snare'
        }))

        expect(
          store.getState()
        ).toEqual({
          presets: {
            1: {
                ...initialState,
              id: 1,
              sample: 'snare',
              mixable: 42,
            }
          },
          mixables: {
            42: {
              ...mixableInitialState,
              id: 42,
              sample: 'snare',
            }
          }
        })

        // Restore util.uuid
        util.uuid = uuid

      })

      it("Does not create a new mixable if one is provided to the action.", () => {

        store.dispatch(presets.actions.createPreset({
          id: 1,
          sample: 'snare',
          mixable: 33,
        }))

        expect(
          store.getState()
        ).toEqual({
          presets: {
            1: {
                ...initialState,
              id: 1,
              sample: 'snare',
              mixable: 33,
            }
          },
          mixables: {},
        })

      })

    })

  })

  describe("selectors", () => {

    describe("getAll()", () => {

      it("Gets all presets.", () => {
        const state = {
          presets: {
            1: {id: 1},
            2: {id: 2}
          }
        }
        const result = [
          {id: 1},
          {id: 2}
        ]
        expect(
          presets.selectors.getAll(state)
        ).toEqual(result)
      })

    })

    describe("getById()", () => {

      it("Gets a preset by id.", () => {
        const state = {
          presets: {
            1: {title: 'megamix'},
            2: {}
          }
        }
        const result = {title: 'megamix'}
        expect(
          presets.selectors.getById(1)(state)
        ).toEqual(result)
      })

    })

  })

})
