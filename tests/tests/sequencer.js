import expect from 'expect'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {sequencer, channels} from 'trax'
import {initialState} from 'trax/lib/sequencer/reducer'
import {initialState as channelInitialState} from 'trax/lib/channels/reducer'

describe("sequencer", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = {}
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a sequencer.", () => {
      const stateBefore = undefined
      const action = {
        type: sequencer.actionTypes.CREATE_SEQUENCER,
        payload: {id: 0}
      }
      const stateAfter = {
        ...initialState,
        id: 0
      }
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Plays", () => {
      const stateBefore = {playing: false}
      const action = sequencer.actions.play()
      const stateAfter = {playing: true}
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Pauses", () => {
      const stateBefore = {playing: true}
      const action = sequencer.actions.pause()
      const stateAfter = {playing: false}
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Steps the beat forward.", () => {
      const stateBefore = {beats: 16, currentBeat: 0}
      const action = sequencer.actions.step()
      const stateAfter = {beats: 16, currentBeat: 1}
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Cycles the beat back to 0 after the last beat.", () => {
      const stateBefore = {beats: 16, currentBeat: 15}
      const action = sequencer.actions.step()
      const stateAfter = {beats: 16, currentBeat: 0}
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Removes a channel.", () => {
      const stateBefore = {
        channels: [1, 2]
      }
      const action = sequencer.actions.removeChannel(1)
      const stateAfter = {
        channels: [2]
      }
      expect(
        sequencer.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

})
