import {Request, ResponseObject, ResponseToolkit} from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import {TaskService} from '../../services';

export default async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  const service = new TaskService((request.server as any).ctx());
  try {
    const id = await service.create((request.payload as any).task);
    return h.response({id}).code(201);
  } catch (e) {
    throw Boom.internal(`Something got wrong saving task, details: ${e}`);
  }
};
