import sequencer from './lib/sequencer'
import channels from './lib/channels'
import blips from './lib/blips'
import presets from './lib/presets'
import mixables from './lib/mixables'
import editor from './lib/editor'
import songs from './lib/songs'
import AudioService from './lib/AudioService'
import Player from './lib/Player'

const reducers = {
  sequencer: sequencer.reducer,
  channels: channels.reducer,
  blips: blips.reducer,
  presets: presets.reducer,
  mixables: mixables.reducer,
  editor: editor.reducer,
  songs: songs.reducer,
}

export {
  reducers,
  sequencer, channels, blips,
  presets, mixables,
  editor, songs,
  AudioService, Player
}
