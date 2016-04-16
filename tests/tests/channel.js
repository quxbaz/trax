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

    it("Child blips inherit the sample property.", () => {
      const stateBefore = {sample: 'kick'}
      const channelState = channel.reducer({sample: 'kick'}, {})
      channelState.blips.forEach((blip) => {
        expect(blip.sample).toEqual('kick')
      })
    })

  })

})
