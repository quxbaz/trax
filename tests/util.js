import * as util from 'trax/lib/util'

describe("util", () => {
  describe("uniqid()", () => {
    it("Creates 10000 unique ids.", () => {
      let ids = new Set()
      for (let i=0; i < 10000; i++)
        ids.add(util.uniqId())
      ids.size.should.eql(10000)
    })
  })
})
