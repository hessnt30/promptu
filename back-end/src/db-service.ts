import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { Prompt } from './models';

export const getDBConnection = async (): Promise<Database> => {
  return open({
    filename: './initial-prompts.db', // relative to project root or use absolute path
    driver: sqlite3.Database
  });
};

export const createPromptTable = async (db: Database) => {
  const query = `
    CREATE TABLE IF NOT EXISTS prompts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      category TEXT NOT NULL
    );
  `;
  await db.exec(query);
};

export const getPrompts = async (
  category: string,
  db: Database
): Promise<Prompt[]> => {
  try {
    const rows = await db.all<Prompt[]>(
      'SELECT text, category FROM prompts WHERE category = ?',
      category
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve prompts');
  }
};

export const savePrompts = async (db: Database, prompts: Prompt[]) => {
  try {
    const insertQuery = `INSERT INTO prompts (text, category) VALUES (?, ?)`;
    const stmt = await db.prepare(insertQuery);
    for (const prompt of prompts) {
      await stmt.run(prompt.text, prompt.category);
    }
    await stmt.finalize();
  } catch (error) {
    console.error('Error saving prompts:', error);
    throw new Error('Failed to save prompts');
  }
};

export const deletePrompt = async (db: Database, id: number) => {
  try {
    await db.run('DELETE FROM prompts WHERE id = ?', id);
  } catch (error) {
    console.error('Error deleting prompt:', error);
    throw new Error('Failed to delete prompt');
  }
};

export const deletePromptTable = async (db: Database) => {
  try {
    await db.exec('DROP TABLE IF EXISTS prompts');
  } catch (error) {
    console.error('Error dropping prompts table:', error);
    throw new Error('Failed to drop prompts table');
  }
};
