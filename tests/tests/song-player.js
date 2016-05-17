import expect from 'expect'
import {songPlayer} from 'trax'
import {initialState} from 'trax/lib/song-player/reducer'

describe("song-player", () => {

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

    it("Plays.", () => {
      const stateBefore = {playing: false}
      const action = songPlayer.actions.play()
      const stateAfter = {playing: true}
      expect(
        songPlayer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Pauses.", () => {
      const stateBefore = {playing: true}
      const action = songPlayer.actions.pause()
      const stateAfter = {playing: false}
      expect(
        songPlayer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Stops.", () => {
      const stateBefore = {playing: true, currentBeat: 10}
      const action = songPlayer.actions.stop()
      const stateAfter = {playing: false, currentBeat: -1}
      expect(
        songPlayer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Restarts.", () => {
      const stateBefore = {playing: false, currentBeat: 2}
      const action = songPlayer.actions.restart()
      const stateAfter = {playing: true, currentBeat: -1}
      expect(
        songPlayer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Toggles playing.", () => {
      const stateBefore = {playing: false}
      const action = songPlayer.actions.togglePlay()
      const stateAfter = {playing: true}
      expect(
        songPlayer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
      expect(
        songPlayer.reducer(stateAfter, action)
      ).toEqual(stateBefore)
    })

    it("Steps the beat forward.", () => {
      const stateBefore = {beats: 16, currentBeat: 0}
      const action = songPlayer.actions.tick()
      const stateAfter = {beats: 16, currentBeat: 1}
      expect(
        songPlayer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Sets the current beat.", () => {
      const stateBefore = {currentBeat: 0}
      const action = songPlayer.actions.setCurrentBeat(7)
      const stateAfter = {currentBeat: 7}
      expect(
        songPlayer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Sets the current song.", () => {
      const stateBefore = {currentSong: undefined}
      const action = songPlayer.actions.setCurrentSong(1)
      const stateAfter = {currentSong: 1}
      expect(
        songPlayer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Clears the current song.", () => {
      const stateBefore = {currentSong: 1}
      const action = songPlayer.actions.clearCurrentSong()
      const stateAfter = {currentSong: null}
      expect(
        songPlayer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

  describe("selectors", () => {

    describe("getCurrentSong", () => {

      it("Gets the current song.", () => {
        const state = {
          songPlayer: {
            currentSong: 1,
          },
          songs: {
            1: {id: 1},
          },
        }
        const result = {id: 1}
        expect(
          songPlayer.selectors.getCurrentSong(state)
        ).toEqual(result)
      })

    })

  })

})
