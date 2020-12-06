function requestLib (name) {
  const instance = require(name)
  if (instance == null) {
    throw new Error('required ' + name + 'try: npm install ' + name)
  }
  return instance
}
exports.requestLib = requestLib
