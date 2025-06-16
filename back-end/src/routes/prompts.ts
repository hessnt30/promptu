// routes/prompts.ts or inside your Express app
import express from 'express';
import { getDBConnection } from '../db-service';
import { Prompt } from '../models';

const router = express.Router();

router.get('/random', async (req, res) => {
  try {
    const db = await getDBConnection();
    const row = await db.get<Prompt>(
      'SELECT id, text, category FROM prompts ORDER BY RANDOM() LIMIT 1'
    );
    res.json(row);
  } catch (err) {
    console.error('Error fetching prompt:', err);
    res.status(500).json({ error: 'Failed to get prompt' });
  }
});

export default router;
