import uuid_ from 'node-uuid'

const times = (n, fn) => {
  const results = []
  for (let i=0; i < n; i++)
    results.push(fn(i))
  return results
}

const values = (obj) => Object.keys(obj).map(k => obj[k])

const uuid = () => uuid_.v4()

const exports = {times, values, uuid}
export default exports
