import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import times from 'qux/lib/times'
import {fetchSample} from '../test-util'
import {
  reducers, channels, blips,
  blocks,
  presets, mixables,
  songs, songAdmin,
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
      blocks.actions.createBlock({
        id: 'block-id',
        channels: [1],
      })
    )

    store.dispatch(
      player.actions.setCurrentBlock('block-id')
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
      mixables.actions.create({id: 'low', sample: 'hihat', rate: 0.7})
    )

    store.dispatch(
      mixables.actions.create({id: 'high', sample: 'hihat', rate: 1.5})
    )

    store.dispatch(
      presets.actions.createPreset({id: 'preset', sample: 'hihat'})
    )

    store.dispatch(
      presets.actions.createPreset({id: 'preset-low', sample: 'hihat', mixable: 'low'})
    )

    store.dispatch(
      presets.actions.createPreset({id: 'preset-high', sample: 'hihat', mixable: 'high'})
    )

    store.dispatch(
      channels.actions.createChannel({
        id: 'channel',
        preset: 'preset',
      })
    )

    store.dispatch(
      channels.actions.createChannel({
        id: 'channel-low',
        preset: 'preset-low',
      })
    )

    store.dispatch(
      channels.actions.createChannel({
        id: 'channel-high',
        preset: 'preset-high',
      })
    )

    store.getState().channels['channel'].blips.forEach((id, i) => {
      store.dispatch(
        channels.actions.toggleBlipAt('channel', i)
      )
    })

    store.getState().channels['channel-low'].blips.forEach((id, i) => {
      store.dispatch(
        channels.actions.toggleBlipAt('channel-low', i)
      )
    })

    store.getState().channels['channel-high'].blips.forEach((id, i) => {
      if ((i % 2) === 0)
        return
      store.dispatch(
        channels.actions.toggleBlipAt('channel-high', i)
      )
    })

    const audioPlayer = new AudioPlayer({audioService, store, tickInterval: 25})

    store.dispatch(blocks.actions.createBlock({
      id: 'block-1',
      channels: ['channel']
    }))

    store.dispatch(blocks.actions.createBlock({
      id: 'block-2',
      channels: ['channel-low']
    }))

    store.dispatch(blocks.actions.createBlock({
      id: 'block-3',
      channels: ['channel-high']
    }))

    store.dispatch(blocks.actions.createBlock({
      id: 'block-4',
      channels: ['channel-low', 'channel-high']
    }))

    store.dispatch(blocks.actions.createBlock({
      id: 'block-5',
      channels: ['channel', 'channel-low', 'channel-high']
    }))

    store.dispatch(songs.actions.createSong({
      id: 'song',
      blocks: ['block-1', 'block-2', 'block-3', 'block-4', null, 'block-5'],
    }))

    store.dispatch(songPlayer.actions.setCurrentSong('song'))

    // store.dispatch(songPlayer.actions.setLoop(true))

    setTimeout(() => {
      audioPlayer.startSong()
    }, 1000)

  })

})
