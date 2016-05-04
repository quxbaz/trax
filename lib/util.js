import uuidLib from 'web-uuid'

const uuid = () => uuidLib.v4()

const replaceAt = (arr, i, sub) => {
  /*
    Returns a copy of arr where the item at position @i is replaced by
    @sub. Does not affect the passed in array @arr.
  */
  const newArr = [...arr]
  newArr[i] = sub
  return newArr
}

const replaceAt2d = (arr, [x, y], sub) => {
  const newArr = [...arr]
  newArr[y] = replaceAt(newArr[y], x, sub)
  return newArr
}

export default {uuid, replaceAt, replaceAt2d}
