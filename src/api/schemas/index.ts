import {AnySchema} from 'joi';

export interface IRouteValidationSchema {
  [k: string]: {
    payload?: AnySchema;
    params?: AnySchema;
    query?: AnySchema;
  };
}
