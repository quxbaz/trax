import expect from 'expect'
import {songs} from 'trax'
import {songInitialState} from 'trax/lib/songs/reducer'

describe("songs", () => {

  describe("reducer", () => {

    it("Gets the initial state.", () => {
      const stateBefore = undefined
      const action = {}
      const stateAfter = {}
      expect(
        songs.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Creates a song.", () => {
      const stateBefore = undefined
      const action = songs.actions.createSong({id: 'foo'})
      const stateAfter = {
        foo: {
          ...songInitialState,
          id: 'foo'
        }
      }
      expect(
        songs.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Removes a song.", () => {
      const stateBefore = {
        1: {id: 1},
        2: {id: 2}
      }
      const action = songs.actions.removeSong(1)
      const stateAfter = {
        2: {id: 2}
      }
      expect(
        songs.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Sets the cursor.", () => {
      const stateBefore = {
        1: {id: 1},
        2: {id: 2},
      }
      const action = songs.actions.setCursor(1, [1, 2])
      const stateAfter = {
        1: {id: 1, cursor: [1, 2]},
        2: {id: 2},
      }
      expect(
        songs.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Sets a channel at a cell.", () => {
      const stateBefore = {
        1: {
          data: [
            [null]
          ]
        },
      }
      const action = songs.actions.setCell(1, [0, 0], 'foo')
      const stateAfter = {
        1: {
          data: [
            ['foo']
          ]
        },
      }
      expect(
        songs.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Empties a channel at a cell.", () => {
      const stateBefore = {
        1: {
          data: [
            ['foo']
          ]
        },
      }
      const action = songs.actions.emptyCell(1, [0, 0])
      const stateAfter = {
        1: {
          data: [
            [null]
          ]
        },
      }
      expect(
        songs.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

    it("Adds lines of data.", () => {
      const stateBefore = {
        1: {
          data: [],
          channels: 8,
        },
      }
      const action = songs.actions.addLines(1, 3)
      const stateAfter = {
        1: {
          data: [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
          ],
          channels: 8,
        },
      }
      expect(
        songs.reducer(stateBefore, action)
      ).toEqual(stateAfter)
    })

  })

  describe("selectors", () => {

    describe("getAll()", () => {
      it("Gets all songs.", () => {
        const state = {
          songs: {
            1: {id: 1},
            2: {id: 2}
          }
        }
        const result = [
          {id: 1},
          {id: 2}
        ]
        expect(
          songs.selectors.getAll(state)
        ).toEqual(result)
      })
    })

    describe("getById()", () => {
      it("Gets a song by id.", () => {
        const state = {
          songs: {
            1: {title: 'whoa'},
            2: {}
          }
        }
        const result = {title: 'whoa'}
        expect(
          songs.selectors.getById(1)(state)
        ).toEqual(result)
      })
    })

  })

})
