import {Request} from '@hapi/hapi';
import {TaskService} from '../../services';
import type {ITask} from '../../services';

export default async (request: Request): Promise<ITask[]> => {
  const service = new TaskService((request.server as any).ctx());
  return service.find({});
};
