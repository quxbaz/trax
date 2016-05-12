import sequencer from './lib/sequencer'
import channels from './lib/channels'
import blips from './lib/blips'
import blocks from './lib/blocks'
import presets from './lib/presets'
import mixables from './lib/mixables'
import editor from './lib/editor'
import songs from './lib/songs'
import player from './lib/player'
import songPlayer from './lib/song-player'
import AudioService from './lib/AudioService'
import AudioPlayer from './lib/AudioPlayer'

const reducers = {
  sequencer: sequencer.reducer,
  channels: channels.reducer,
  blips: blips.reducer,
  blocks: blocks.reducer,
  presets: presets.reducer,
  mixables: mixables.reducer,
  editor: editor.reducer,
  songs: songs.reducer,
  player: player.reducer,
  songPlayer: songPlayer.reducer,
}

export {
  reducers,
  sequencer, channels, blips,
  blocks,
  presets, mixables,
  editor, songs,
  player, songPlayer,
  AudioService, AudioPlayer,
}
