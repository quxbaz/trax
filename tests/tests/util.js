import expect from 'expect'
import util from 'trax/lib/util'

describe("util", () => {

  describe("times", () => {

    it("Executes a function n times.", () => {
      expect(
        util.times(5, (i) => i)
      ).toEqual([0, 1, 2, 3, 4])
    })

  })

  describe("values", () => {
    it("Gets the values of an object.", () => {
      expect(util.values({})).toEqual([])
      expect(util.values({a:1})).toEqual([1])
      expect(util.values({a:1, b:2, c:3})).toEqual([1, 2, 3])
    })
  })

})
