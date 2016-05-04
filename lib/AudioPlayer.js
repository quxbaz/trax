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
import {channels, blips, mixables, player} from 'trax'

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
        const blipId = channel.blips[state.player.currentBeat]
        if (isNil(blipId))
          return
        const blip = blips.selectors.getById(blipId)(state)
        const mixable = mixables.selectors.getById(blip.mixable)(state)
        this.audioService.play({...blip, ...mixable})
      })
    })

  }

  start() {
    this.timer.start()
  }

  pause() {
    this.timer.stop()
  }

}

export default AudioPlayer
