import expect from 'expect'
import {sequencer, channel} from 'trax'
import {initialState} from 'trax/lib/sequencer/reducer'

describe("sequencer", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const action = {}
      const stateBefore = undefined
      const stateAfter = {}
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a sequencer.", () => {
      const action = {
        type: sequencer.actionTypes.CREATE,
        payload: {id: 0}
      }
      const stateBefore = undefined
      const stateAfter = {
        ...initialState,
        id: 0
      }
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

//     it("Plays", () => {
//       const action = sequencer.actions.play()
//       const stateBefore = {playing: false}
//       const stateAfter = {playing: true}
//       expect(
//         sequencer.reducer(stateBefore, action)
//       ).toEqual(stateAfter)
//     })

//     it("Pauses", () => {
//       const action = sequencer.actions.pause()
//       const stateBefore = {playing: true}
//       const stateAfter = {playing: false}
//       expect(
//         sequencer.reducer(stateBefore, action)
//       ).toEqual(stateAfter)
//     })

//     it("Steps the beat forward.", () => {
//       const action = sequencer.actions.step()
//       const stateBefore = {beats: 16, currentBeat: 0}
//       const stateAfter = {beats: 16, currentBeat: 1}
//       expect(
//         sequencer.reducer(stateBefore, action)
//       ).toEqual(stateAfter)
//     })

//     it("Cycles the beat back to 0 after the last beat.", () => {
//       const action = sequencer.actions.step()
//       const stateBefore = {beats: 16, currentBeat: 15}
//       const stateAfter = {beats: 16, currentBeat: 0}
//       expect(
//         sequencer.reducer(stateBefore, action)
//       ).toEqual(stateAfter)
//     })

//     it("Adds a channel.", () => {
//       const action = sequencer.actions.addChannel({mute: true})
//       const stateBefore = {channels: []}
//       const stateAfter = {channels: [{
//         sample: '',
//         beats: 16,
//         mute: true,
//         blips: defaultBlips,
//       }]}
//       expect(
//         sequencer.reducer(stateBefore, action)
//       ).toEqual(stateAfter)
//     })

  })

})
