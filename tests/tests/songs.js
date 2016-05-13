import expect from 'expect'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {songs} from 'trax'
import {songInitialState} from 'trax/lib/songs/reducer'

describe("songs", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = {}
      expect(
        songs.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a song.", () => {

      const store = createStore(
        combineReducers({
          songs: songs.reducer,
        }),
        applyMiddleware(thunk)
      )

      store.dispatch(
        songs.actions.createSong({id: 1, name: 'foo'})
      )

      expect(store.getState()).toEqual({
        songs: {
          1: {
            ...songInitialState,
            id: 1,
            name: 'foo',
          }
        }
      })

    })

    it("Removes a song.", () => {
      const stateBefore = {
        1: {id: 1},
        2: {id: 2}
      }
      const action = songs.actions.removeSong(1)
      const stateAfter = {
        2: {id: 2}
      }
      expect(
        songs.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Adds a block.", () => {
      const stateBefore = {
        1: {blocks: []},
      }
      const action = songs.actions.addBlock(1, 2)
      const stateAfter = {
        1: {blocks: [2]},
      }
      expect(
        songs.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Removes a block.", () => {
      const stateBefore = {
        1: {blocks: [2]},
      }
      const action = songs.actions.removeBlock(1, 2)
      const stateAfter = {
        1: {blocks: []},
      }
      expect(
        songs.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

  describe("selectors", () => {

    describe("getAll()", () => {
      it("Gets all songs.", () => {
        const state = {
          songs: {
            1: {id: 1},
            2: {id: 2}
          }
        }
        const result = [
          {id: 1},
          {id: 2}
        ]
        expect(
          songs.selectors.getAll(state)
        ).toEqual(result)
      })
    })

    describe("getById()", () => {
      it("Gets a song by id.", () => {
        const state = {
          songs: {
            1: {title: 'whoa'},
            2: {}
          }
        }
        const result = {title: 'whoa'}
        expect(
          songs.selectors.getById(1)(state)
        ).toEqual(result)
      })
    })

  })

})
