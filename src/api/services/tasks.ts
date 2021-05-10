import {Collection, QuerySelector, SortOptionObject} from 'mongodb';
import {IRestAPI} from '.';
import {IContext} from '../../main';

export interface ITask {
  name: string;
  description: string;
  when: Date;
}

export default class TaskService implements IRestAPI<ITask> {
  private client: Collection<ITask>;
  collection = 'tasks';
  constructor(ctx: IContext) {
    this.client = ctx.database.collection(this.collection);
  }
  async findOne(query: QuerySelector<ITask>) {
    return this.client.findOne(query);
  }
  async find(
    query: QuerySelector<ITask>,
    sort?: SortOptionObject<ITask>
  ): Promise<ITask[]> {
    return this.client.find(query, {sort}).toArray();
  }
  async count(query: QuerySelector<ITask>): Promise<number> {
    return this.client.countDocuments(query);
  }
  async create(data: ITask): Promise<void> {
    this.client.insertOne(data);
  }
  async createMany(data: ITask[]): Promise<void> {
    this.client.insertMany(data);
  }
}
