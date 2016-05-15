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

    it("Sets the current beat.", () => {
      const stateBefore = {}
      const action = player.actions.setCurrentBeat(5)
      const stateAfter = {currentBeat: 5}
      expect(
        player.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Restarts from the first beat and starts playing.", () => {
      const stateBefore = {}
      const action = player.actions.restart()
      const stateAfter = {currentBeat: -1, playing: true}
      expect(
        player.reducer(stateBefore, action)
      ).toEqual(stateAfter)
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

    it("Sets the current block.", () => {
      const stateBefore = {currentBlock: undefined}
      const action = player.actions.setCurrentBlock(1)
      const stateAfter = {currentBlock: 1}
      expect(
        player.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Clears the current block.", () => {
      const stateBefore = {currentBlock: 1}
      const action = player.actions.clearCurrentBlock()
      const stateAfter = {currentBlock: null}
      expect(
        player.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

  describe("selectors", () => {

    describe("getCurrentBlock", () => {

      it("Gets the current block.", () => {
        const state = {
          player: {
            currentBlock: 1,
          },
          blocks: {
            1: {id: 1},
          },
        }
        const result = {id: 1}
        expect(
          player.selectors.getCurrentBlock(state)
        ).toEqual(result)
      })

    })

  })

})
