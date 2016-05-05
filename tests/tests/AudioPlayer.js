import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import times from 'qux/lib/times'
import {fetchSample} from '../test-util'
import {
  reducers, channels, blips,
  presets, mixables, songs,
  player, songPlayer,
  AudioService, AudioPlayer
} from 'trax'

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

    const audioPlayer = new AudioPlayer({audioService, store, tickInterval: 50})

    setTimeout(() => {
      audioPlayer.timer.trigger('tick')
      audioPlayer.timer.trigger('tick')
      audioPlayer.timer.trigger('tick')
      audioPlayer.timer.trigger('tick')
    }, 200)

  })

  it("Plays a song.", () => {

    const store = createStore(
      combineReducers(reducers),
      applyMiddleware(thunk)
    )

    store.dispatch(
      presets.actions.createPreset({id: 'preset1', sample: 'hihat'})
    )

    store.dispatch(
      mixables.actions.createMixable({id: 'mixable1', sample: 'hihat', rate: 1.5})
    )

    store.dispatch(
      presets.actions.createPreset({id: 'preset2', sample: 'hihat', mixable: 'mixable1'})
    )

    store.dispatch(
      channels.actions.createChannel({
        id: 'channel1',
        preset: 'preset1',
      })
    )

    store.dispatch(
      channels.actions.createChannel({
        id: 'channel2',
        preset: 'preset2',
      })
    )

    store.dispatch(
      channels.actions.createChannel({
        id: 'channel3',
        preset: 'preset1',
      })
    )

    store.getState().channels['channel1'].blips.forEach((id, i) => {
      store.dispatch(
        channels.actions.toggleBlipAt('channel1', i)
      )
    })

    store.getState().channels['channel2'].blips.forEach((id, i) => {
      store.dispatch(
        channels.actions.toggleBlipAt('channel2', i)
      )
    })

    store.getState().channels['channel3'].blips.forEach((id, i) => {
      if ((i % 2) === 0)
        return
      store.dispatch(
        channels.actions.toggleBlipAt('channel3', i)
      )
    })

    const audioPlayer = new AudioPlayer({audioService, store, tickInterval: 100})

    store.dispatch(
      songPlayer.actions.createSongPlayer({beatDuration: 25})
    )

    store.dispatch(
      songs.actions.createSong({
        data: [
          ['channel1'],
          ['channel2'],
          ['channel3'],
          ['channel1', 'channel2'],
        ]
      })
    )

    setTimeout(() => {
      audioPlayer.playSong(
        songs.selectors.getAll(store.getState())[0]
      )
    }, 1000)

  })

})
