import * as Joi from 'joi';
import {IRouteValidationSchema} from '..';
import {ITask} from '../../services';

export const payloadTaskSchema = Joi.object<ITask>({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  when: Joi.date().iso().required(),
}).required();

export const rules: IRouteValidationSchema = {
  create: {
    payload: Joi.object({
      task: payloadTaskSchema,
    }),
  },
};
