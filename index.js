import sequencer from './lib/sequencer'
import channels from './lib/channels'
import blips from './lib/blips'
import presets from './lib/presets'
import AudioService from './lib/AudioService'
import Player from './lib/Player'

const reducers = {
  sequencer: sequencer.reducer,
  channels: channels.reducer,
  blips: blips.reducer,
  presets: presets.reducer,
}

export {
  reducers,
  sequencer, channels, blips,
  presets,
  AudioService, Player
}
