const fastify = require('fastify')
const { requestLib } = require('./utils')

class FastRS {
  constructor (options = {}) {
    this.config = {}
    this.server = fastify(Object.assign(options, {
      logger: process.env.NODE_ENV === 'development'
    }))
    this.server.addSchema({
      $id: 'error',
      type: 'object',
      properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' }
      },
      required: ['statusCode', 'error', 'message']
    })
    this.server.register(require('fastify-sensible'))
    this.server.register(require('fastify-auth'))
  }

  addConfig (schema, dotenv = false) {
    const envSchema = require('env-schema')
    const config = envSchema({ schema, dotenv })
    Object.assign(this.config, config)
    return this
  }

  addSecurityCors (options = {}) {
    const cors = requestLib('fastify-cors')
    this.server.register(cors, options)
    return this
  }

  addSecurityCsrf (options = {}) {
    const csrf = requestLib('fastify-csrf')
    this.server.register(csrf, options)
    return this
  }

  addSecurityJWT (options = {}) {
    const jwt = requestLib('fastify-jwt')
    this.server.register(jwt, options)
    return this
  }

  addSecurityHelmet (options = {}) {
    const helmet = requestLib('fastify-helmet')
    this.server.register(helmet, options)
    return this
  }

  async listen () {
    return this.server.listen(
      this.config.PORT || '8080',
      this.config.HOST || '0.0.0.0'
    )
  }
}

module.exports = FastRS
