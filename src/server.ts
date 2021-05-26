import {Server} from '@hapi/hapi';
import Bell from '@hapi/bell';
import Cookie from '@hapi/cookie';
import config from '@config';
import api from './api';
import type {IContext} from './main';

const setAuthStrategies = async (server: Server): Promise<void> => {
  await server.register(Bell);
  await server.register(Cookie);

  server.auth.strategy('session', 'cookie', {
    cookie: {
      password: config.auth.password,
      isSecure: false,
    },
    redirectTo: '/login',
  });

  //Set default session strategy to persist session obtainer from auth0
  server.auth.strategy('auth0', 'bell', {
    provider: 'auth0',
    config: {
      domain: config.auth.provider.auth0.domain,
    },
    password: config.auth.password,
    clientId: config.auth.provider.auth0.clientId,
    clientSecret: config.auth.provider.auth0.secret,
    isSecure: false, // Terrible idea but required if not using HTTPS especially if developing locally
  });

  //Set auth0 strategy to fetch user credentials an authenticate over Auth0
  server.route({
    method: ['GET', 'POST'], // Must handle both GET and POST
    path: '/login', // The callback endpoint registered with the provider
    options: {
      auth: {
        mode: 'try',
        strategy: 'auth0',
      },
      handler: function (request, h) {
        if (!request.auth.isAuthenticated) {
          return `Authentication failed due to: ${request.auth.error.message}`;
        }

        // Perform any account lookup or registration, setup local session,
        // and redirect to the application. The third-party credentials are
        // stored in request.auth.credentials. Any query parameters from
        // the initial request are passed back via request.auth.credentials.query.

        const {profile, token} = request.auth.credentials;
        request.cookieAuth.set({
          token: token,
          userId: (profile as any).id,
        });

        return h.redirect('/api');
      },
    },
  });
  server.auth.default('session');
};

const registerPlugins = async (server: Server): Promise<void> => {
  await setAuthStrategies(server);

  //Register api in server
  await server.register(api, {
    routes: {
      prefix: '/api',
    },
  });
};

export const init = async (): Promise<Server> => {
  const server = new Server({
    port: config.common.port,
    host: config.common.host,
    router: {
      stripTrailingSlash: true,
      isCaseSensitive: true,
    },
  });
  await server.initialize();
  return server;
};

export const run = async (ctx: IContext): Promise<void> => {
  const server = await init();

  await registerPlugins(server);

  server.decorate('server', 'ctx', () => ctx);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};
