import {blip, AudioService} from 'trax'

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
    audioService = new AudioService(audioContext, {
      'hihat': hihat
    })
  })

  it("Should play four audible hihat sounds (this test will always pass).", () => {
    const state = blip.reducer(undefined, {
      type: blip.actionTypes.CREATE_BLIP,
      payload: {
        sample: 'hihat'
      }
    })
    audioService.play(state)
    audioService.play({...state, offset: 100})
    audioService.play({...state, offset: 200})
    audioService.play({...state, offset: 300})
  })

})
