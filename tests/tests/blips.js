import expect from 'expect'
import {blips} from 'trax'
import {initialState} from 'trax/lib/blips/reducer'

describe("blip", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const action = {}
      const stateBefore = undefined
      const stateAfter = {}
      expect(
        blips.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a blip.", () => {
      const action = {
        type: blips.actionTypes.CREATE,
        payload: {id: 0}
      }
      const stateBefore = undefined
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

  })

})
