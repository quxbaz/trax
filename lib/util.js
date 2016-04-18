export const times = (n, fn) => {
  const results = []
  for (let i=0; i < n; i++)
    results.push(fn(i))
  return results
}
