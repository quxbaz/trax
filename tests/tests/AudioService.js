import {blips, AudioService} from 'trax'

function decodeAudioData(audioContext, audioBuffer) {
  return new Promise(resolve => {
    audioContext.decodeAudioData(audioBuffer, (decoded) =>
      resolve(decoded)
    )
  })
}

function fetchSample(audioContext, url) {
  return fetch(url).then((response) =>
    response.arrayBuffer()
  ).then((buffer) =>
    decodeAudioData(audioContext, buffer)
  )
}

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
