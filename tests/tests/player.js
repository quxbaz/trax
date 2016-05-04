import expect from 'expect'
import {player} from 'trax'
import {initialState} from 'trax/lib/player/reducer'

describe("player", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = initialState
      expect(
        player.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a player.", () => {
      const stateBefore = undefined
      const action = player.actions.createPlayer({id: 0})
      const stateAfter = {
        ...initialState,
        id: 0
      }
      expect(
        player.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Plays.", () => {
      const stateBefore = {playing: false}
      const action = player.actions.play()
      const stateAfter = {playing: true}
      expect(
        player.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Pauses.", () => {
      const stateBefore = {playing: true}
      const action = player.actions.pause()
      const stateAfter = {playing: false}
      expect(
        player.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Toggles playing.", () => {
      const stateBefore = {playing: false}
      const action = player.actions.togglePlay()
      const stateAfter = {playing: true}
      expect(
        player.reducer(stateBefore, action)
      ).toEqual(stateAfter)
      expect(
        player.reducer(stateAfter, action)
      ).toEqual(stateBefore)
    })

    it("Steps the beat forward.", () => {
      const stateBefore = {beats: 16, currentBeat: 0}
      const action = player.actions.tick()
      const stateAfter = {beats: 16, currentBeat: 1}
      expect(
        player.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Cycles the beat back to 0 after the last beat.", () => {
      const stateBefore = {beats: 16, currentBeat: 15}
      const action = player.actions.tick()
      const stateAfter = {beats: 16, currentBeat: 0}
      expect(
        player.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

})
