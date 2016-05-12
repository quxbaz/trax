import expect from 'expect'
import values from 'qux/lib/values'
import util from 'trax/lib/util'

describe("util", () => {

  describe("replaceAt", () => {

    it("Replaces an item in an array.", () => {
      expect(
        util.replaceAt(['foo', 'bar', 'qux'], 1, 'foo2')
      ).toEqual(
        ['foo', 'foo2', 'qux']
      )
    })

    it("Does not affect the original array.", () => {
      const arr = ['a', 'b', 'c']
      expect(util.replaceAt(arr, 0, 'foo'))
        .toEqual(['foo', 'b', 'c'])
      expect(arr).toEqual(['a', 'b', 'c'])
    })

    it("Maintains the identity of the original array.", () => {
      const arr = ['a', 'b', 'c']
      const handle = arr
      util.replaceAt(arr, 0, 'foo')
      expect(handle).toBe(arr)
    })

  })

  describe("replaceAt2d", () => {

    it("Replaces an item in a 2d array without mutating the array.", () => {

      const arr = [
        [1, 2, 3]
      ]

      const result = util.replaceAt2d(arr, [1, 0], 'foo')

      expect(result).toEqual([
        [1, 'foo', 3]
      ])

      expect(arr).toEqual([
        [1, 2, 3]
      ])

    })

  })

  describe("getEnabledChannels", () => {

    it("Gets channels that are not mute.", () => {
      const state = {
        channels: {
          1: {id: 1, mute: false},
          2: {id: 2, mute: false},
          3: {id: 3, mute: true}
        }
      }
      const result = [
        {id: 1, mute: false},
        {id: 2, mute: false}
      ]
      expect(
        util.getEnabledChannels(values(state.channels))
      ).toEqual(result)
    })

    it("Gets channels that are not archived.", () => {
      const state = {
        channels: {
          1: {id: 1, mute: false, archived: true},
          2: {id: 2, mute: false, archived: false}
        }
      }
      const result = [
        {id: 2, mute: false, archived: false}
      ]
      expect(
        util.getEnabledChannels(values(state.channels))
      ).toEqual(result)
    })

    it("Gets only channels that are soloing even if they are mute, but does not get archived channels.", () => {
      const state = {
        channels: {
          1: {id: 1, mute: false, solo: true},
          2: {id: 2, mute: true, solo: true},
          3: {id: 3, solo: true},
          4: {id: 4, solo: false},
          5: {id: 5, solo: true, archived: true}
        }
      }
      const result = [
        {id: 1, mute: false, solo: true},
        {id: 2, mute: true, solo: true},
        {id: 3, solo: true}
      ]
      expect(
        util.getEnabledChannels(values(state.channels))
      ).toEqual(result)
    })

  })

})
