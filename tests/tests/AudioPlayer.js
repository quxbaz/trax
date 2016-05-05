import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {fetchSample} from '../test-util'
import {reducers, channels, blips, presets, player, AudioService, AudioPlayer} from 'trax'

describe("AudioPlayer", () => {

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

  it("Plays a bunch of hihat sounds sequentially.", () => {

    const store = createStore(
      combineReducers(reducers),
      applyMiddleware(thunk)
    )

    const audioPlayer = new AudioPlayer({audioService, store, tickInterval: 50})

    store.dispatch(player.actions.createPlayer({playing: true}))

    store.dispatch(
      presets.actions.createPreset({id: 44, sample: 'hihat'})
    )

    store.dispatch(
      channels.actions.createChannel({
        id: 1,
        sample: 'hihat',
        preset: 44,
      })
    )

    store.getState().channels[1].blips.forEach((id, i) => {
      store.dispatch(
        channels.actions.toggleBlipAt(1, i)
      )
    })

    let offset =  0
    const play = audioService.play.bind(audioService)
    audioService.play = (state) => {
      play({...state, offset})
      offset += 50
    }

    setTimeout(() => {
      audioPlayer.timer.trigger('tick')
      audioPlayer.timer.trigger('tick')
      audioPlayer.timer.trigger('tick')
      audioPlayer.timer.trigger('tick')
    }, 200)

  })

})
