import expect from 'expect'
import {blips} from 'trax'
import {blipInitialState} from 'trax/lib/blips/reducer'

describe("blips", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = {}
      expect(
        blips.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a blip.", () => {
      const stateBefore = undefined
      const action = blips.actions.createBlip({id: 0})
      const stateAfter = {
        0: {
          ...blipInitialState,
          id: 0
        }
      }
      expect(
        blips.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Toggles mute on blip.", () => {
      const stateBefore = {1: {mute: false}}
      const action = blips.actions.toggleMuteBlip(1)
      const stateAfter = {1: {mute: true}}
      expect(
        blips.reducer(stateBefore, action)
      ).toEqual(stateAfter)
      expect(
        blips.reducer(stateAfter, action)
      ).toEqual(stateBefore)
    })

  })

  describe("selectors", () => {

    describe("getAll()", () => {

      it("Gets all blips.", () => {
        const state = {
          blips: {
            1: {id:1},
            2: {id:2}
          }
        }
        const result = [
          {id: 1},
          {id: 2}
        ]
        expect(
          blips.selectors.getAll(state)
        ).toEqual(result)
      })

    })

    describe("getById()", () => {

      it("Gets a blip by id.", () => {
        const state = {
          blips: {
            1: {sample: 'snare'},
            2: {}
          }
        }
        const result = {sample: 'snare'}
        expect(
          blips.selectors.getById(1)(state)
        ).toEqual(result)
      })

      it("Memoizes.", () => {

      })

    })

  })

})
