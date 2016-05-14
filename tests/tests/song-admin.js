import expect from 'expect'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {songs, songAdmin} from 'trax'
import {initialState} from 'trax/lib/song-admin/reducer'
import {songInitialState} from 'trax/lib/songs/reducer'

describe("song-admin", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = initialState
      expect(
        songAdmin.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Sets the current song.", () => {
      const stateBefore = {currentSong: undefined}
      const action = songAdmin.actions.setCurrentSong(1)
      const stateAfter = {currentSong: 1}
      expect(
        songAdmin.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

  describe("selectors", () => {

    describe("getCurrentSong()", () => {

      it("Gets the current song.", () => {
        const state = {
          songAdmin: {currentSong: 1},
          songs: {
            1: {id: 1}
          },
        }
        const result = {id: 1}
        expect(
          songAdmin.selectors.getCurrentSong(state)
        ).toEqual(result)
      })

    })

  })

})
