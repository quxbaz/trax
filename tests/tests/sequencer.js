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
      const action = sequencer.actions.create({id: 0})
      const stateAfter = {
        ...initialState,
        id: 0
      }
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

})
