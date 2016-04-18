import sequencer from './lib/sequencer'
import channels from './lib/channels'
import blips from './lib/blips'
import AudioService from './lib/AudioService'

const reducer = (state, action) => {
  return {
    sequencer: sequencer.reducer(state.sequencer, action),
    channels: channel.reducer(state.channels, action),
    blips: blip.reducer(state.blips, action)
  }
}

export {reducer, sequencer, channels, blips, AudioService}
