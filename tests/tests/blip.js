import expect from 'expect'
import {blip} from 'trax'

const initialState = Object.freeze({
  beat: undefined,
  sample: '',
  mute: false,
  duration: 0,
  offset: 0,
  minOffset: 0,
  maxOffset: 3600,
  gain: 1,
  minGain: 0,
  maxGain: 10,
  rate: 1,
  minRate: 0,
  maxRate: 4
})

describe("blip", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const action = {}
      const stateBefore = undefined
      const stateAfter = initialState
      expect(
        blip.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

})
