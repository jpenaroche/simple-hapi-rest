import {Server} from '@hapi/hapi';
import config from './api/config';
import api from './api';
import type {IContext} from './main';

const registerPlugins = async (server: Server): Promise<void> => {
  //Register api in server
  return server.register(api, {
    routes: {
      prefix: '/api',
    },
  });
};

export const run = async (ctx: IContext): Promise<void> => {
  const server = new Server({
    port: config.common.port,
    host: config.common.host,
  });

  await registerPlugins(server);
  server.decorate('server', 'ctx', () => ctx);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};
