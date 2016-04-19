import expect from 'expect'
import {blips} from 'trax'
import {initialState} from 'trax/lib/blips/reducer'

describe("blip", () => {

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
          ...initialState,
          id: 0
        }
      }
      expect(
        blips.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates many blips.", () => {
      const stateBefore = undefined
      const action = blips.actions.createManyBlips([{id: 0}, {id: 1}, {id: 2, sample: 'snare'}])
      const stateAfter = {
        0: {...initialState, id: 0},
        1: {...initialState, id: 1},
        2: {...initialState, id: 2, sample: 'snare'}
      }
      expect(
        blips.reducer(stateBefore, action)
      ).toEqual(stateAfter)
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

    describe("getSome()", () => {

      it("Gets blips by id.", () => {
        const state = {
          blips: {
            1: {id:1},
            2: {id:2},
            3: {id:3}
          }
        }
        const result = [
          {id: 1},
          {id: 3}
        ]
        expect(
          blips.selectors.getSome([1, 3])(state)
        ).toEqual(result)
      })

    })

  })

})
