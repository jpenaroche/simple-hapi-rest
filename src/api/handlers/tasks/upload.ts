import {Request, ResponseObject, ResponseToolkit} from '@hapi/hapi';
import Boom from '@hapi/boom';
import {blob} from '@lib';
export default async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const {file} = request.payload as any;
    await blob.onLocalFS(file, file.hapi.filename);
    return h.response('done').code(201);
  } catch (e) {
    console.error(e);
    throw Boom.internal('Something got wrong uploading the file');
  }
};
