import expect from 'expect'
import {songPlayer} from 'trax'
import {initialState} from 'trax/lib/song-player/reducer'

describe("songPlayer", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = initialState
      expect(
        songPlayer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a song player.", () => {
      const stateBefore = undefined
      const action = songPlayer.actions.createSongPlayer({id: 0})
      const stateAfter = {
        ...initialState,
        id: 0,
      }
      expect(
        songPlayer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Sets a starting line to begin playing from.", () => {
      const stateBefore = {}
      const action = songPlayer.actions.setStart(2)
      const stateAfter = {startLine: 2}
      expect(
        songPlayer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Resets the currently playing line.", () => {
      const stateBefore = {}
      const action = songPlayer.actions.resetCurrentPlayingLine()
      const stateAfter = {currentPlayingLine: -1}
      expect(
        songPlayer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Increments the currently playing line..", () => {
      const stateBefore = {currentPlayingLine: 1}
      const action = songPlayer.actions.incCurrentPlayingLine()
      const stateAfter = {currentPlayingLine: 2}
      expect(
        songPlayer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

})
