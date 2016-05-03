import expect from 'expect'
import {sequencer} from 'trax'
import {initialState} from 'trax/lib/sequencer/reducer'

describe("sequencer", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = initialState
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a sequencer.", () => {
      const stateBefore = undefined
      const action = sequencer.actions.createSequencer({id: 0})
      const stateAfter = {
        ...initialState,
        id: 0
      }
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Plays.", () => {
      const stateBefore = {playing: false}
      const action = sequencer.actions.play()
      const stateAfter = {playing: true}
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Pauses.", () => {
      const stateBefore = {playing: true}
      const action = sequencer.actions.pause()
      const stateAfter = {playing: false}
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Toggles playing.", () => {
      const stateBefore = {playing: false}
      const action = sequencer.actions.togglePlay()
      const stateAfter = {playing: true}
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
      expect(
        sequencer.reducer(stateAfter, action)
      ).toEqual(stateBefore)
    })

    it("Steps the beat forward.", () => {
      const stateBefore = {beats: 16, currentBeat: 0}
      const action = sequencer.actions.tick()
      const stateAfter = {beats: 16, currentBeat: 1}
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Cycles the beat back to 0 after the last beat.", () => {
      const stateBefore = {beats: 16, currentBeat: 15}
      const action = sequencer.actions.tick()
      const stateAfter = {beats: 16, currentBeat: 0}
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

  describe("selectors", () => {

    describe("isSoloMode", () => {
      it("Returns false if no channels are in solo mode.", () => {
        const state = {
          channels: {
            0: {solo: false}
          }
        }
        expect(
          sequencer.selectors.isSoloMode(state)
        ).toBe(false)
      })
      it("Returns true if any channels are in solo mode.", () => {
        const state = {
          channels: {
            0: {solo: true},
            1: {solo: false}
          }
        }
        expect(
          sequencer.selectors.isSoloMode(state)
        ).toBe(true)
      })
    })

  })

})
