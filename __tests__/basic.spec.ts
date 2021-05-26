import {Server} from '@hapi/hapi';
import {init} from '../src/server';

describe('Basic Unit Test Suite', () => {
  let server: Server = null;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });
  it('Should return "hello" text from basic test endpoint', async () => {
    server.route({
      method: 'GET',
      path: '/hello',
      handler: (request, h) => {
        return h.response('hello').code(201);
      },
    });

    const response = await server.inject({
      url: '/hello',
      method: 'GET',
    });

    expect.assertions(2);
    expect(response.statusCode).toBe(201);
    expect(response.payload).toBe('hello');
  });
});
