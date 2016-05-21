import expect from 'expect'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {id, mixables} from 'trax'
import {mixableInitialState} from 'trax/lib/mixables/reducer'

describe("mixables", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = {}
      expect(
        mixables.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a mixable.", () => {
      const store = createStore(
        combineReducers({
          id: id.reducer,
          mixables: mixables.reducer,
        }),
        applyMiddleware(thunk)
      )
      const stateBefore = undefined
      store.dispatch(
        mixables.actions.createMixable({id: 'foo'})
      )
      const stateAfter = {
        foo: {
          ...mixableInitialState,
          id: 'foo',
        }
      }
      expect(
        store.getState().mixables
      ).toEqual(stateAfter)
    })

    it("Removes a mixable.", () => {
      const stateBefore = {
        1: {},
        2: {}
      }
      const action = mixables.actions.removeMixable(1)
      const stateAfter = {
        2: {}
      }
      expect(
        mixables.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Deep copies a mixable.", () => {
      const store = createStore(
        combineReducers({
          id: id.reducer,
          mixables: mixables.reducer,
        }),
        {
          id: '0',
          mixables: {
            0: {id: '0', gain: 4},
          },
        },
        applyMiddleware(thunk)
      )
      store.dispatch(mixables.actions.deepCopyMixable('0', {id: '1'}))
      expect(store.getState().mixables).toEqual({
        0: {id: '0', gain: 4},
        1: {id: '1', gain: 4},
      })
    })

    it("Mixes a mixable.", () => {
      const stateBefore = {
        0: {
          ...mixableInitialState,
          id: 0
        }
      }
      const action = mixables.actions.mix(0, {gain: 5, rate: 4})
      const stateAfter = {
        0: {
          ...mixableInitialState,
          id: 0,
          gain: 5,
          rate: 4
        }
      }
      expect(
        mixables.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

  describe("selectors", () => {

    describe("getAll()", () => {

      it("Gets all mixables.", () => {
        const state = {
          mixables: {
            1: {id: 1},
            2: {id: 2}
          }
        }
        const result = [
          {id: 1},
          {id: 2}
        ]
        expect(
          mixables.selectors.getAll(state)
        ).toEqual(result)
      })

    })

    describe("getById()", () => {

      it("Gets a mixable by id.", () => {
        const state = {
          mixables: {
            1: {gain: 0.5},
            2: {}
          }
        }
        const result = {gain: 0.5}
        expect(
          mixables.selectors.getById(1)(state)
        ).toEqual(result)
      })

    })

  })

})
