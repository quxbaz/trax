import id from './lib/id'
import sequencer from './lib/sequencer'
import channels from './lib/channels'
import blips from './lib/blips'
import blocks from './lib/blocks'
import presets from './lib/presets'
import mixables from './lib/mixables'
import songs from './lib/songs'
import player from './lib/player'
import songPlayer from './lib/song-player'
import AudioService from './lib/AudioService'
import AudioPlayer from './lib/AudioPlayer'

const reducers = {
  id: id.reducer,
  sequencer: sequencer.reducer,
  channels: channels.reducer,
  blips: blips.reducer,
  blocks: blocks.reducer,
  presets: presets.reducer,
  mixables: mixables.reducer,
  songs: songs.reducer,
  player: player.reducer,
  songPlayer: songPlayer.reducer,
}

export {
  reducers,
  id,
  sequencer, channels, blips,
  blocks, songs,
  presets, mixables,
  player, songPlayer,
  AudioService, AudioPlayer,
}
