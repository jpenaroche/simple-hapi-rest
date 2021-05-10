import {MongoClient} from 'mongodb';

export type IMongoParams = {
  db_name: string;
  db_password: string;
  db_user: string;
};

const getClient = (parameters: IMongoParams) => {
  const {db_name, db_password, db_user} = parameters;
  const uri = `mongodb+srv://${db_user}:${db_password}@sandbox.ayybd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  let client: MongoClient | null = null;
  return async () => {
    console.info('Connecting to Mongo Atlas');
    if (!client) {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    if (!client.isConnected()) {
      try {
        await client.connect();
      } catch (e) {
        throw new Error(`Something got wrong with database connection: ${e}`);
      }
    }
    return client.db(db_name);
  };
};

export default getClient;
