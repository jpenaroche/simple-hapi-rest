import {QuerySelector, SortOptionObject} from 'mongodb';
import TaskService, {ITask} from './tasks';

export interface IRestAPI<T> {
  find: (query: QuerySelector<T>, sort?: SortOptionObject<T>) => Promise<T[]>;
  findOne: (query: QuerySelector<T>) => Promise<T | null>;
  count?: (query: QuerySelector<T>) => Promise<number>;
  create?: (data: T) => Promise<void>;
  createMany?: (data: T[]) => Promise<void>;
}

export type AsDocument<T> = {_id: any} & T;

export {TaskService, ITask};
