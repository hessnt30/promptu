import express from 'express';
import promptsRouter from './routes/prompts';

const app = express();
app.listen(8000, () => {
  console.log('Server running on port 8000');
});

app.use('/api/prompts', promptsRouter);
