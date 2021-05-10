import {Request} from '@hapi/hapi';
import {TaskService} from '../../services';

export default async (request: Request): Promise<number> => {
  const service = new TaskService((request.server as any).ctx());
  try {
    service.create((request.payload as any).task);
  } catch (e) {
    throw new Error(`Something got wrong saving task, details: ${e}`);
  }
  return service.count({});
};
