/// <reference types="fastify-sensible" />
/// <reference types="fastify-auth" />

import { FastifyInstance } from 'fastify'
import { FastifyCorsOptions } from 'fastify-cors'
import { FastifyCsrfOptions } from 'fastify-csrf'
import { FastifyJWTOptions } from 'fastify-jwt'

import helmet from 'helmet'

declare type FastifyHelmetOptions = Parameters<typeof helmet>[0];

declare class FastRS<Config> {

    /**
     * Environment Configuration
     */
    config: Config
    server: FastifyInstance

    /**
     * Load Configuration Environment
     * 
     * @param schema 
     */
    addConfig<Config>(schema: object): FastRS<Config>;

    /**
     * Load plugin https://github.com/fastify/fastify-cors
     * 
     * @param options FastifyCorsOptions
     */
    addSecurityCors<Config>(options: FastifyCorsOptions): FastRS<Config>;

    /**
     * Load plugin https://github.com/fastify/fastify-jwt
     * 
     * @param options FastifyHelmetOptions
     */
    addSecurityJWT<Config>(options: FastifyJWTOptions): FastRS<Config>;

    /**
     * Load plugin https://github.com/fastify/fastify-helmet
     * 
     * @param options FastifyHelmetOptions
     */
    addSecurityHelmet<Config>(options: FastifyHelmetOptions): FastRS<Config>;

    /**
     * Load plugin https://github.com/fastify/fastify-csrf
     * 
     * @param options FastifyCsrfOptions
     */
    addSecurityCsrf<Config>(options: FastifyCsrfOptions): FastRS<Config>;

    /**
     * Start server
     */
    listen(): Promise<string>;
}
