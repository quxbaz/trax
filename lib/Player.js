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

import Timer from 'timer'
import AudioService from './AudioService'
import {sequencer, channels, blips} from 'trax'

class Player {

  constructor({audioService, store, tickInterval}) {

    this.audioService = audioService
    this.store = store
    this.timer = new Timer({tickInterval})

    this.timer.on('tick', () => {
      if (!store.getState().sequencer.playing)
        return
      this.store.dispatch(sequencer.actions.tick())
      const state = store.getState()
      channels.selectors.getEnabled(state).forEach((channel) => {
        const blip = blips.selectors.getById(
          channel.blips[state.sequencer.currentBeat]
        )(state)
        this.audioService.play(blip)
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

export default Player
