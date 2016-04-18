import expect from 'expect'
import {channels} from 'trax'
import {initialState} from 'trax/lib/channels/reducer'

describe("channel", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const action = {}
      const stateBefore = undefined
      const stateAfter = {}
      expect(
        channels.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a channel.", () => {
      const action = {
        type: channels.actionTypes.CREATE,
        payload: {id: 'foo'}
      }
      const stateBefore = undefined
      const stateAfter = {
        foo: {
          ...initialState,
          id: 'foo'
        }
      }
      expect(
        channels.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    // it("Creates a channel.", () => {
    //   const action = {
    //     type: channels.actionTypes.CREATE,
    //     payload: {id: 'foo'}
    //   }
    //   const stateBefore = undefined
    //   const stateAfter = {
    //     foo: {
    //       ...initialState,
    //       id: 'foo'
    //     }
    //   }
    //   expect(
    //     channels.reducer(stateBefore, action)
    //   ).toEqual(stateAfter)
    // })

    // it("Child blips inherit the sample property.", () => {
    //   const stateBefore = {sample: 'kick'}
    //   const channelState = channel.reducer({sample: 'kick'}, {})
    //   channelState.blips.forEach((blip) => {
    //     expect(blip.sample).toEqual('kick')
    //   })
    // })

  })

})
