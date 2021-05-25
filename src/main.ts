require('module-alias/register');

import {Db} from 'mongodb';
import initDatabase, {IMongoParams} from './database';
import {run} from './server';
import config from '@config';

// Add more connections (Redis, RabbitMQ, etc...)
export type IContext = {
  database: Db;
};

const bootstrap = async (): Promise<IContext> => {
  //Connecting to Atlas Cluster
  const connect = initDatabase(config.database as IMongoParams);
  const database = await connect();
  return {
    database,
  };
};

const handleErrors = (ctx: IContext) => (error: Error) => {
  console.error(error);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
};

bootstrap().then((ctx: IContext) => {
  process.on('unhandledRejection', handleErrors(ctx));
  process.on('uncaughtException', handleErrors(ctx));
  run(ctx);
});
