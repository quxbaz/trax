import expect from 'expect'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {id, presets, mixables} from 'trax'
import util from 'trax/lib/util'
import {presetInitialState} from 'trax/lib/presets/reducer'
import {mixableInitialState} from 'trax/lib/mixables/reducer'

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
            id: id.reducer,
            presets: presets.reducer,
            mixables: mixables.reducer,
          }),
          applyMiddleware(thunk)
        )
      })

      it("Creates a preset and a default mixable that inherits some properties.", () => {

        store.dispatch(presets.actions.createPreset({
          id: 'preset',
          sample: 'snare'
        }))

        expect(
          store.getState()
        ).toEqual({
          id: '1',
          presets: {
            preset: {
                ...presetInitialState,
              id: 'preset',
              sample: 'snare',
              mixable: '1',
            }
          },
          mixables: {
            1: {
              ...mixableInitialState,
              id: '1',
              sample: 'snare',
            }
          }
        })

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
          id: '0',
          presets: {
            1: {
                ...presetInitialState,
              id: 1,
              sample: 'snare',
              mixable: 33,
            }
          },
          mixables: {},
        })

      })

    })

    describe("removePreset", () => {

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

      it("Removes a preset and its mixable.", () => {

        store.dispatch(
          mixables.actions.create({id: 0})
        )

        store.dispatch(
          mixables.actions.create({id: 1})
        )

        store.dispatch(
          presets.actions.createPreset({id: 2, mixable: 0})
        )

        // Make sure initial conditions are set
        expect(store.getState()).toEqual({
          mixables: {
            0: {
              ...mixableInitialState,
              id: 0
            },
            1: {
              ...mixableInitialState,
              id: 1
            }
          },
          presets: {
            2: {
              ...presetInitialState,
              id: 2,
              mixable: 0
            }
          }
        })

        store.dispatch(
          presets.actions.removePreset(2)
        )

        expect(store.getState()).toEqual({
          mixables: {
            1: {...mixableInitialState, id: 1}
          },
          presets: {}
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
