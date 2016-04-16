const defaultGainValue = (() => {
  let val
  return audioContext => {
    if (val === undefined)
      val = audioContext.createGain().gain.value
    return val
  }
}).call()

export default class AudioService {

  constructor(audioContext, sampleMap={}) {
    if (audioContext === undefined)
      throw new Error('You must provide an AudioContext object.')
    this.audioContext = audioContext
    this.sampleMap = sampleMap
  }

  isMute(state) {
    return state.mute || !state.sample
  }

  play(state) {
    if (this.isMute(state))
      return
    let source = this.audioContext.createBufferSource()
    source.buffer = this.sampleMap[state.sample]
    this.connectModifiers(state, source)
    source.connect(this.audioContext.destination)
    source.start(this.audioContext.currentTime + (state.offset || 0) / 1000)
  }

  connectModifiers(state, source) {
    /*
      Links modifier nodes to a buffer source.
    */
    source.playbackRate.value = state.rate
    if (state.gain != defaultGainValue(this.audioContext)) {
      const gainNode = this.audioContext.createGain()
      gainNode.gain.value = state.gain
      source.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
    }
  }

}
