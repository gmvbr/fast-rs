const FastRS = require('./fast-rs')

async function run (done) {
  exports._instance = new FastRS()
  await done(exports._instance)
  await exports._instance.listen()
}
exports.run = run

async function config (k) {
  return exports._instance.config[k]
}
exports.config = config
