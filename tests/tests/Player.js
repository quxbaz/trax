import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {fetchSample} from '../test-util'
import {reducers, sequencer, channels, blips, AudioService, Player} from 'trax'

describe("Player", () => {

  const audioContext = new AudioContext()
  let audioService
  let hihat

  before(() => {
    return fetchSample(audioContext, '/hihat.mp3').then(sample => {
      hihat = sample
    })
  })

  beforeEach(() => {
    audioService = new AudioService(audioContext, {hihat})
  })

  it("Plays a bunch of hihat sounds sequentially.", (done) => {

    const store = createStore(
      combineReducers(reducers),
      applyMiddleware(thunk)
    )

    const player = new Player({audioService, store, tickInterval: 50})

    store.dispatch(sequencer.actions.createSequencer({playing: true}))

    store.dispatch(
      channels.actions.createChannel({
        sample: 'hihat',
        id: 1
      })
    )

    store.getState().channels[1].blips.forEach((id, i) => {
      store.dispatch(
        channels.actions.toggleBlipAt(1, i)
      )
    })

    let i = 0
    const play = audioService.play.bind(audioService)
    audioService.play = (state) => {
      play(state)
      if (i == 4) {
        player.pause()
        done()
      }
      i++
    }

    player.start()

  })

})
