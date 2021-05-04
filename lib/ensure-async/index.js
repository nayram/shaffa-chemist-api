module.exports = async function ensureAsync(predicate, errorFunc, value) {
  if (await predicate(value)) return value
  throw errorFunc(value)
}
