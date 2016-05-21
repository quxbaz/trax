import expect from 'expect'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {blocks, songs} from 'trax'
import {blockInitialState} from 'trax/lib/blocks/reducer'
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

    it("Adds a block at a position.", () => {
      const stateBefore = {
        1: {blocks: ['a', 'c']},
      }
      const action = songs.actions.addBlockAt(1, 'b', 1)
      const stateAfter = {
        1: {blocks: ['a', 'b', 'c']},
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

    it("Removes a block from a song when the block is removed.", () => {
      const store = createStore(
        combineReducers({
          blocks: blocks.reducer,
          songs: songs.reducer,
        }), {
          blocks: {a: {}},
          songs: {1: {blocks: ['a', 'b']}},
        }
      )
      store.dispatch(blocks.actions.removeBlock('a'))
      expect(store.getState().songs[1]).toEqual({
        blocks: ['b']
      })
    })

    it("Takes a block and moves it to another index.", () => {
      const stateBefore = {id: {blocks: ['a', 'b', 'c']}}
      const action = songs.actions.moveBlock('id', 2, 1)
      const stateAfter = {id: {blocks: ['a', 'c', 'b']}}
      expect(
        songs.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a block.", () => {

      const store = createStore(
        combineReducers({
          songs: songs.reducer,
          blocks: blocks.reducer,
        }),
        {
          songs: {
            1: {id: 1, blocks: []}
          },
        },
        applyMiddleware(thunk)
      )

      const action = store.dispatch(
        songs.actions.createBlock(1, {id: 2})
      )

      expect(action).toEqual({
        type: blocks.actionTypes.CREATE_BLOCK,
        payload: {id: 2, song: 1},
      })

      expect(store.getState()).toEqual({
        songs: {
          1: {id: 1, blocks: [2]}
        },
        blocks: {
          2: {
            ...blockInitialState,
            id: 2,
            song: 1,
          }
        },
      })

    })

    it("Creates a block at an index.", () => {

      const store = createStore(
        combineReducers({
          songs: songs.reducer,
          blocks: blocks.reducer,
        }),
        {
          songs: {
            1: {id: 1, blocks: ['a', 'c', 'd']}
          },
        },
        applyMiddleware(thunk)
      )

      const action = store.dispatch(
        songs.actions.createBlockAt(1, 1, {id: 'b'})
      )

      expect(store.getState().songs[1].blocks).toEqual(
        ['a', 'b', 'c', 'd']
      )

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

    describe("getBlocks()", () => {
      it("Gets a song's blocks.", () => {
        const state = {
          songs: {
            1: {blocks: ['a', 'b']},
          },
          blocks: {
            'a': {id: 'a'},
            'b': {id: 'b'},
            'c': {id: 'c'},
          },
        }
        expect(
          songs.selectors.getBlocks(1)(state)
        ).toEqual([
          {id: 'a'},
          {id: 'b'},
        ])
      })
    })

  })

})
