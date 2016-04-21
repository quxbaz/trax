import {fetchSample} from '../test-util'
import {blips, AudioService} from 'trax'

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
    const state = blips.reducer(undefined, {
      type: blips.actionTypes.CREATE_BLIP,
      payload: {
        id: 0,
        sample: 'hihat',
        mute: false
      }
    })[0]
    audioService.play(state)
    audioService.play({...state, offset: 100})
  })

})
