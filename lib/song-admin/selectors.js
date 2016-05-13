import songs from '../songs'

const getCurrentSong = (state) => (
  songs.selectors.getById(
    state.songAdmin.currentSong
  )(state)
)

export default {
  getCurrentSong,
}
