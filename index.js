import sequencer from './lib/sequencer'
import channel from './lib/channels'
import blip from './lib/blips'
import AudioService from './lib/AudioService'

const reducer = (state, action) => {
  return {
    sequencer: sequencer.reducer(state.sequencer, action),
    channels: channel.reducer(state.channels, action),
    blips: blip.reducer(state.blips, action)
  }
}

export {reducer, sequencer, channel, blip, AudioService}
