import expect from 'expect'
import {presets} from 'trax'
import {initialState} from 'trax/lib/presets/reducer'

describe("presets", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = {}
      expect(
        presets.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a preset.", () => {
      const stateBefore = undefined
      const action = presets.actions.createPreset({id: 0})
      const stateAfter = {
        0: {
          ...initialState,
          id: 0
        }
      }
      expect(
        presets.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

  describe("selectors", () => {

    describe("getAll()", () => {

      it("Gets all presets.", () => {
        const state = {
          presets: {
            1: {id: 1},
            2: {id: 2}
          }
        }
        const result = [
          {id: 1},
          {id: 2}
        ]
        expect(
          presets.selectors.getAll(state)
        ).toEqual(result)
      })

    })

    describe("getById()", () => {

      it("Gets a preset by id.", () => {
        const state = {
          presets: {
            1: {title: 'megamix'},
            2: {}
          }
        }
        const result = {title: 'megamix'}
        expect(
          presets.selectors.getById(1)(state)
        ).toEqual(result)
      })

    })

  })

})
