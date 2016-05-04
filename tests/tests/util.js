import expect from 'expect'
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

})
