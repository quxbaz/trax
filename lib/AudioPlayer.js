/*
  Audio player and timer

  API:

  constructor({
    audioService: <AudioService instance>,
    store: <redux store>,
    tickInterval: <interval in milliseconds between ticks>
  })

*/

import isNil from 'qux/lib/isNil'
import Timer from 'timer2'
import AudioService from './AudioService'
import {channels, blips, blocks, blockAdmin, mixables, songs, player} from 'trax'

class AudioPlayer {

  constructor({audioService, store, tickInterval}) {

    // Method bindings
    this.handleTimerTick = this.handleTimerTick.bind(this)

    // Keepings references to arguments
    this.audioService = audioService
    this.store = store

    // Creating Timers
    this.timer = new Timer({tickInterval})

    // Timer events
    this.timer.on('tick', this.handleTimerTick)

  }

  handleTimerTick() {

    if (!this.store.getState().player.playing)
      return

    this.store.dispatch(player.actions.tick())
    const state = this.store.getState()

    const block = blockAdmin.selectors.getActiveBlock(state)
    blocks.selectors.getEnabledChannels(block.id)(state).forEach((channel) => {
      this.playBlip(state, channel.blips[state.player.currentBeat])
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

}

export default AudioPlayer
