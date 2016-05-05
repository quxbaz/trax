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

  })

})
