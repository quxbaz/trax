import AudioService from 'trax/lib/audioservice';
import Blip from 'trax/lib/blip';

function decodeAudioData(audioContext, audioBuffer) {
  return new Promise(resolve => {
    audioContext.decodeAudioData(audioBuffer, decoded =>
      resolve(decoded)
    )
  })
}

function getSoundSample(audioContext) {
  let args = ['/hihat.mp3', {responseType: 'arraybuffer'}]
  return fetch('/hihat.mp3').then((resp) =>
    resp.arrayBuffer()
  ).then((buffer) =>
    decodeAudioData(audioContext, buffer)
  )
  // return http.get(...args).then(audioBuffer =>
  //   decodeAudioData(audioContext, audioBuffer)
  // )
}

describe("AudioService", function() {

  let audioService
  let audioContext = new AudioContext()
  let hihatSample

  before(() => {
    return getSoundSample(audioContext).then(sample => {
      hihatSample = sample
    })
  })

  beforeEach(() => {
    audioService = new AudioService(audioContext, {
      'hihat': hihatSample
    })
  })

  it("should play two audible hihat sounds (this test will always pass).", () => {
    let blip = new Blip({sample: 'hihat'})
    audioService.playBlip(blip.state)
    setTimeout(() => {
      audioService.playBlip(blip.state)
    }, 200)
  })

})
