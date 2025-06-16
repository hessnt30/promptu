import { Database } from 'sqlite';
import { savePrompts } from './db-service';
import { Prompt } from './models';
import fs from 'fs/promises';
import path from 'path';

export const loadPromptsFromFile = async (db: Database) => {
  try {
    const fileName = 'initial-prompts.json';
    const filePath = path.join(__dirname, fileName);
    const data = await fs.readFile(filePath, 'utf-8');
    const prompts: Prompt[] = JSON.parse(data);

    await savePrompts(db, prompts);
    console.log(`Prompts from ${fileName} sucessfully loaded into databse.`);
  } catch (error) {
    console.error('Failed to load prompts:', error);
  }
};
