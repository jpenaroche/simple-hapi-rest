import {Server} from '@hapi/hapi';
import routes from './routes';

export default {
  name: 'api',
  version: '1.0.0',
  register: async function (server: Server) {
    server.route({
      method: 'GET',
      path: '/',
      options: {
        auth: {
          strategy: 'session',
          mode: 'required',
        },
      },
      handler: (request, h) => {
        return h.response('Hello from Tasks API');
      },
    });
    server.route(routes.tasks);
  },
};
