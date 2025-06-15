import {
  enablePromise,
  openDatabase,
  ResultSet,
  SQLErrors,
  SQLiteDatabase
} from 'react-native-sqlite-storage';
import { Prompt } from 'models';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'initial-prompts.db', location: 'default' });
};

export const createPromptTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS prompts(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL, category TEXT NOT NULL);`;
  await db.executeSql(query);
};

export const getPrompts = async (
  category: string,
  db: SQLiteDatabase
): Promise<Prompt[]> => {
  try {
    const prompts: Prompt[] = [];
    const results = await db.executeSql(
      `SELECT text FROM prompts WHERE prompts.category = ?;`,
      [category]
    );
    results.forEach((result) => {
      for (let i = 0; i < result.rows.length; i++) {
        const prompt = result.rows.item(i) as Prompt;
        prompts.push(prompt);
      }
    });
    return prompts;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve prompts');
  }
};
