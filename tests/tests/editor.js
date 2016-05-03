import expect from 'expect'
import {editor} from 'trax'
import {initialState} from 'trax/lib/editor/reducer'

describe("editor", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = initialState
      expect(
        editor.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

  describe("selectors", () => {

    describe("getEditor", () => {
      it("Gets the editor.", () => {
        const state = {editor: {id: 0}}
        const result = {id: 0}
        expect(
          editor.selectors.getEditor(state)
        ).toEqual(result)
      })
    })

  })

})
