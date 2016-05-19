import expect from 'expect'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {id} from 'trax'

describe("id", () => {

  describe("reducer", () => {

    it("Increments.", () => {
      const stateBefore = '0'
      const action = id.actions.inc()
      const stateAfter = '1'
      expect(
        id.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Gets a new id if an id is not provided in state.", () => {
      const store = createStore(
        combineReducers({id: id.reducer}),
        {id: '0'},
        applyMiddleware(thunk)
      )
      expect(
        store.dispatch(id.actions.gen())
      ).toEqual('1')
      expect(store.getState()).toEqual({id: '1'})
    })

    it("Gets a the id prop in state if it exists.", () => {
      const store = createStore(
        combineReducers({id: id.reducer}),
        {id: '0'},
        applyMiddleware(thunk)
      )
      expect(
        store.dispatch(id.actions.gen({id: 'foo'}))
      ).toEqual('foo')
      expect(store.getState()).toEqual({id: '0'})
    })

    it("ids are stored as string types.", () => {
      const store = createStore(
        combineReducers({id: id.reducer}),
        applyMiddleware(thunk)
      )
      expect(
        typeof store.dispatch(id.actions.gen())
      ).toBe('string')
      expect(
        typeof store.getState().id
      ).toBe('string')
    })

  })

})
