import {Db} from 'mongodb';
import initDatabase, {IMongoParams} from './database';
import {run} from './server';
import config from './api/config';

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

bootstrap().then(run);

process.on('unhandledRejection', err => {
  console.error(err);
  throw err;
});

process.on('uncaughtException', err => {
  console.error(err);
  throw err;
});
