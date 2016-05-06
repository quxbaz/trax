/*
  Audio player and timer

  API:

  constructor({
    audioService: <AudioService instance>,
    store: <redux store>,
    tickInterval: <interval in milliseconds between ticks>
  })

  # Starts an internal timer that plays a sound every tick
  player.start()

  # Pauses the internal timer
  player.pause()

  # Plays a sound
  player.play(<state>)

*/

import isNil from 'qux/lib/isNil'
import Timer from 'timer'
import AudioService from './AudioService'
import {channels, blips, mixables, songs, player, songPlayer} from 'trax'

class AudioPlayer {

  constructor({audioService, store, tickInterval}) {

    this.audioService = audioService
    this.store = store
    this.timer = new Timer({tickInterval})

    this.timer.on('tick', () => {
      if (!store.getState().player.playing)
        return
      this.store.dispatch(player.actions.tick())
      const state = store.getState()
      channels.selectors.getEnabled(state).forEach((channel) => {
        this.playBlip(state, channel.blips[state.player.currentBeat])
      })
    })

    this.songTimer = new Timer()
    this.songTimer.on('tick', () => {
      this.store.dispatch(
        songPlayer.actions.incCurrentPlayingLine()
      )
    })

  }

  playBlip(state, blipId, stateFn) {
    if (isNil(blipId))
      return
    if (stateFn === undefined)
      stateFn = x => x
    const blip = blips.selectors.getById(blipId)(state)
    const mixable = mixables.selectors.getById(blip.mixable)(state)
    this.audioService.play(
      stateFn({...blip, ...mixable})
    )
  }

  start() {
    this.timer.start()
  }

  pause() {
    this.timer.stop()
  }

  playSong(songId, startY) {
    this.audioService.drop()
    const state = this.store.getState()
    const song = songs.selectors.getById(songId)(state)
    const {startLine, beatDuration} = state.songPlayer
    if (startY === undefined)
      startY = startLine

    this.songTimer.setTickInterval(beatDuration * 16)
    this.songTimer.start()

    for (let y = startY; y < song.data.length; y++) {
      song.data[y].forEach((channelId) => {
        if (isNil(channelId))
          return
        const channel = channels.selectors.getById(channelId)(state)
        channel.blips.forEach((blipId, x) => {
          this.playBlip(state, blipId, (combinedState) => ({
              ...combinedState,
            offset: combinedState.offset + (beatDuration * 16 * (y - startY)) + (beatDuration * x),
          }))
        })
      })
    }
  }

  stopSong() {
    this.songTimer.stop()
    this.store.dispatch(
      songPlayer.actions.resetCurrentPlayingLine()
    )
    this.audioService.drop()
  }

}

export default AudioPlayer
