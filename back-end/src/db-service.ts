import {
  enablePromise,
  openDatabase,
  SQLiteDatabase
} from 'react-native-sqlite-storage';
import { Prompt } from 'models/prompt';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'initial-prompts.db', location: 'default' });
};

export const createTable = async (tableName: string, db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};
