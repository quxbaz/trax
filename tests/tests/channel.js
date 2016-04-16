import expect from 'expect'
import {defaultBlips} from '../util'
import {channel} from 'trax'

describe("channel", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const action = {}
      const stateBefore = undefined
      const stateAfter = {
        sample: '',
        beats: 16,
        mute: false,
        blips: defaultBlips
      }
      expect(
        channel.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

})
