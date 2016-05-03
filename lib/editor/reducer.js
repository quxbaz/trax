export const initialState = Object.freeze({
  id: undefined,
  currentSong: undefined,
  songs: [],
})

const editor = (state=initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default editor
