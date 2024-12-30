import express from 'express';
import routes from './routes';

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use('/api', routes);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
