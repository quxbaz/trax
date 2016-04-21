const decodeAudioData = (audioContext, audioBuffer) => {
  return new Promise(resolve => {
    audioContext.decodeAudioData(audioBuffer, (decoded) =>
      resolve(decoded)
    )
  })
}

export const fetchSample = (audioContext, url) => {
  return fetch(url).then((response) =>
    response.arrayBuffer()
  ).then((buffer) =>
    decodeAudioData(audioContext, buffer)
  )
}
