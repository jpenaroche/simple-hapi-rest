import type {ServerRoute} from '@hapi/hapi';
import handlers from '../handlers';
import {taskRequestValidation} from '../schemas/requests';

export const tasks: ServerRoute[] = [
  {
    method: 'get',
    path: '/tasks',
    handler: handlers.tasks.list,
    options: {
      auth: {
        mode: 'required',
        strategy: 'session',
      },
    },
  },
  {
    method: 'post',
    path: '/tasks',
    handler: handlers.tasks.create,
    options: {
      payload: {
        parse: true,
      },
      auth: {
        mode: 'required',
        strategy: 'session',
      },
      validate: taskRequestValidation.rules.create,
    },
  },
  {
    method: 'post',
    path: '/tasks/upload',
    handler: handlers.tasks.upload,
    options: {
      payload: {
        parse: true,
        allow: [
          'application/json',
          'multipart/form-data',
          'image/jpeg',
          'application/pdf',
          'application/x-www-form-urlencoded',
        ],
        maxBytes: 1024 * 1024 * 100,
        // timeout: false,
        multipart: {
          output: 'stream',
        },
      },
      auth: {
        mode: 'required',
        strategy: 'session',
      },
      validate: taskRequestValidation.rules.upload,
    },
  },
];
