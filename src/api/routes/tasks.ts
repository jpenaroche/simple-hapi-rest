import type {ServerRoute} from '@hapi/hapi';
import handlers from '../handlers';
import {taskRequestValidation} from '../schemas/requests';

export const tasks: ServerRoute[] = [
  {
    method: 'get',
    path: '/tasks',
    handler: handlers.tasks.list,
  },
  {
    method: 'post',
    path: '/tasks',
    handler: handlers.tasks.create,
    options: {
      validate: taskRequestValidation.rules.create,
    },
  },
];
