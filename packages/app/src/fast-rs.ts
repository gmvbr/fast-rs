/* eslint-disable @typescript-eslint/no-explicit-any */
import helmet from 'helmet';

import fastify, {FastifyInstance} from 'fastify';

import {FastifyCorsOptions} from 'fastify-cors';
import {FastifyCsrfOptions} from 'fastify-csrf';
import {FastifyJWTOptions} from 'fastify-jwt';

import {requestLib} from './utils';

export type FastifyHelmetOptions = Parameters<typeof helmet>[0];

export class FastRS<Config> {
  public server?: FastifyInstance;
  public config?: Config;

  constructor(options: unknown = {}) {
    this.server = fastify(
      Object.assign(options, {
        logger: process.env.NODE_ENV === 'development',
      })
    );
    this.server.addSchema({
      $id: 'error',
      type: 'object',
      properties: {
        statusCode: {type: 'integer'},
        error: {type: 'string'},
        message: {type: 'string'},
      },
      required: ['statusCode', 'error', 'message'],
    });
    this.server.register(require('fastify-sensible'));
    this.server.register(require('fastify-auth'));
  }

  addConfig(schema: object) {
    const envSchema = require('env-schema');
    const config = envSchema({schema, dotenv: true});
    this.config = Object.assign(this.config || {}, config);
    return this;
  }

  addSecurityCors(options: FastifyCorsOptions = {}) {
    const cors = requestLib('fastify-cors');
    this.server!.register(cors, options);
    return this;
  }

  addSecurityCsrf(options: FastifyCsrfOptions) {
    const csrf = requestLib('fastify-csrf');
    this.server!.register(csrf, options);
    return this;
  }

  addSecurityJWT(options: FastifyJWTOptions) {
    const jwt = requestLib('fastify-jwt');
    this.server!.register(jwt, options);
    return this;
  }

  addSecurityHelmet(options: FastifyHelmetOptions = {}) {
    const helmet = requestLib('fastify-helmet');
    this.server!.register(helmet, options);
    return this;
  }

  async listen() {
    const config = this.config! as any;
    return this.server!.listen(config.PORT || '8080', config.HOST || '0.0.0.0');
  }
}
