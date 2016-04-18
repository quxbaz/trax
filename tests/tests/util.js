import expect from 'expect'
import {times} from 'trax/lib/util'

describe("util", () => {

  describe("times", () => {

    it("Executes a function n times", () => {
      expect(
        times(5, (i) => i)
      ).toEqual([0, 1, 2, 3, 4])
    })

  })

})
