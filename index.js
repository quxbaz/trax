import sequencer from './lib/sequencer'
import channels from './lib/channels'
import blips from './lib/blips'
import AudioService from './lib/AudioService'
import Player from './lib/Player'

const reducers = {
  sequencer: sequencer.reducer,
  channels: channels.reducer,
  blips: blips.reducer
}

export {reducers, sequencer, channels, blips, AudioService, Player}
