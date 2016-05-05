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
    this.soundSwitch = this.audioContext.createGain()
    this.soundSwitch.connect(this.audioContext.destination)
  }

  drop() {
    /*
      Silences any sounds currently playing, but does not prevent
      scheduling future sounds.
    */
    this.switchOff(true)
    this.switchOn()
  }

  switchOff(drop=true) {
    /*
      If @drop is true, scheduled sounds will not be resumed when
      switchOn() is called.
    */
    this.soundSwitch.gain.value = -1
    if (drop) {
      this.soundSwitch = this.audioContext.createGain()
      this.soundSwitch.gain.value = -1
      this.soundSwitch.connect(this.audioContext.destination)
    }
  }

  switchOn() {
    this.soundSwitch.gain.value = 1
  }

  isMute(state) {
    return state.mute || !state.sample
  }

  play(state) {
    if (this.isMute(state))
      return
    const source = this.audioContext.createBufferSource()
    source.buffer = this.sampleMap[state.sample]
    this.connectModifiers(state, source)
    source.connect(this.soundSwitch)
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
