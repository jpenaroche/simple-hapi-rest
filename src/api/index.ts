import {Server} from '@hapi/hapi';
import routes from './routes';

export default {
  name: 'api',
  version: '1.0.0',
  register: async function (server: Server) {
    server.route(routes.tasks);
  },
};
