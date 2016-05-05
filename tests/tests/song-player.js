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

  })

})
