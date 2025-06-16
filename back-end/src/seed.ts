import { getDBConnection, createPromptTable } from './db-service';
import { loadPromptsFromFile } from './load-prompts';

(async () => {
  const db = await getDBConnection();
  await createPromptTable(db);
  await loadPromptsFromFile(db);
  await db.close();
})();
