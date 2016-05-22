import {fetchSample} from '../test-util'
import {blips, mixables, AudioService} from 'trax'

describe("AudioService", function() {

  const audioContext = new AudioContext()
  let audioService
  let hihat

  before(() => {
    return fetchSample(audioContext, '/hihat.mp3').then(sample => {
      hihat = sample
    })
  })

  beforeEach(() => {
    audioService = new AudioService(audioContext, {hihat})
  })

  it("Should play two audible hihat sounds (this test will always pass).", () => {
    const blip = blips.reducer(undefined, {
      type: blips.actionTypes.CREATE,
      payload: {
        id: 0,
        mute: false,
      }
    })[0]
    const mixable = mixables.reducer(undefined, {
      type: mixables.actionTypes.CREATE,
      payload: {
        id: 0,
        sample: 'hihat',
      },
    })[0]
    const state = {...blip, ...mixable}
    audioService.play(state)
    audioService.play({...state, offset: 50})
  })

})
